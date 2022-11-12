import { promises as fs } from 'fs';
import * as path from 'path';
import * as process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import * as moment from 'moment';
import * as lodash from 'lodash';
import { Types } from 'mongoose';
import { validateEmail } from './validateEmail';

/*
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0
1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
params: sheetUrl, sheetName, data range
const result = await getSheetData('1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', 'funds', A2:E')
const result = await getSheetData('https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0','funds', 'A2:E')
lodash.omitBy(obj, lodash.isNil) -> remove undefined, null properties of an object
*/

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'src/flatworks/utils/token.json');
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  'src/flatworks/utils/credentials.json',
);

const loadCredential = async () => {
  try {
    const content = (await fs.readFile(TOKEN_PATH)) as any;
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
};

const saveCredential = async (client) => {
  const content = (await fs.readFile(CREDENTIALS_PATH)) as any;
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
};

const authorize = async () => {
  let client = (await loadCredential()) as any;
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredential(client);
  }
  return client;
};

const getSheetData = async (sheetUrl, sheetName, range) => {
  const spreadsheetId = sheetUrl.includes(
    'https://docs.google.com/spreadsheets',
  )
    ? sheetUrl.split('https://docs.google.com/spreadsheets/d')[1].split('/')[1]
    : sheetUrl;
  const auth = await authorize();
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!${range}`,
  });
  return res.data.values;
};

const fundTransform = (data: any[]) => {
  const filteredData = data.filter((item) => item[0]);
  return filteredData.map((item) => {
    const name = item[0].trim();
    const description = item[4];
    const currency =
      item[2] && ['usd', 'ada'].includes(item[2]) ? item[2] : 'usd';
    const budget =
      item[1] && parseInt(item[1] as string) ? parseInt(item[1] as string) : 0;
    const date = moment(item[3], 'MM-DD-YYYY').isValid()
      ? moment(item[3], 'MM-DD-YYYY').toDate()
      : moment().toDate();

    const record = { name, currency, budget, date, description };
    return lodash.omitBy(record, lodash.isNil);
  });
};

const proposerTransform = (data: any[]) => {
  const filteredData = data.filter(
    (item) => item[0] && item[1] && validateEmail(item[1]),
  );
  return filteredData.map((item) => {
    const fullName = item[0].trim();
    const email = item[1].trim();
    const telegram = item[2];
    const walletAddress = item[3];
    const description = item[4];

    const record = { fullName, email, telegram, walletAddress, description };
    return lodash.omitBy(record, lodash.isNil);
  });
};

const challengeTransform = async (data: any[], fundService) => {
  const filteredData = data.filter((item) => item[0] && item[1]);
  return await Promise.all(
    filteredData.map(async (item) => {
      const name = item[0].trim();
      const fund = item[1].trim();
      const fundRecord = await fundService.findByName(fund);
      const nullFundId = new Types.ObjectId().toString();
      const fundId = lodash.get(fundRecord, '_id', nullFundId);
      const description = item[3];
      const budget =
        item[2] && parseInt(item[2] as string)
          ? parseInt(item[2] as string)
          : 0;

      const record = { name, fundId, budget, description };
      return lodash.omitBy(record, lodash.isNil);
    }),
  );
};

const proposalTransform = async (
  data: any[],
  fundService,
  challengeService,
  proposerService,
) => {
  const filteredData = data.filter(
    (item) => item[0] && item[1] && item[2] && item[3] && item[4],
  );
  return await Promise.all(
    filteredData.map(async (item) => {
      const nullId = new Types.ObjectId().toString();
      const projectId = item[0].trim();
      const name = item[1].trim();
      const fund = item[2].trim();
      const challenge = item[3].trim();
      const proposer = item[4].trim();
      const fundRecord = await fundService.findByName(fund);
      const fundId = lodash.get(fundRecord, '_id', nullId);
      const challengeRecord = await challengeService.findByName(
        fundId,
        challenge,
      );
      const challengeId = lodash.get(challengeRecord, '_id', nullId);
      const proposerRecord = await proposerService.findByName(proposer);
      const proposerId = lodash.get(proposerRecord, '_id', nullId);
      const requestedBudget =
        item[5] && parseInt(item[5] as string)
          ? parseInt(item[5] as string)
          : 0;
      const projectStatus = item[6];
      const proposalUrl = item[7];
      const gitLink = item[8];
      const walletAddress = item[9];
      const smartContract = item[10];
      const previousProposals = item[11];
      const startDate = moment(item[12], 'MM-DD-YYYY').isValid()
        ? moment(item[12], 'MM-DD-YYYY').toDate()
        : moment().toDate();
      const completeDate = moment(item[13], 'MM-DD-YYYY').isValid()
        ? moment(item[13], 'MM-DD-YYYY').toDate()
        : moment().toDate();
      const description = item[14];
      const record = {
        projectId,
        name,
        fundId,
        challengeId,
        proposerId,
        requestedBudget,
        projectStatus,
        proposalUrl,
        gitLink,
        walletAddress,
        smartContract,
        previousProposals,
        startDate,
        completeDate,
        description,
      };

      return lodash.omitBy(record, lodash.isNil);
    }),
  );
};

export {
  getSheetData,
  fundTransform,
  challengeTransform,
  proposerTransform,
  proposalTransform,
};
