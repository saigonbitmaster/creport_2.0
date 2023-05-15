import { promises as fs } from 'fs';
import * as path from 'path';
import * as process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import * as moment from 'moment';
import * as lodash from 'lodash';
import { Types } from 'mongoose';
import { validateEmail } from './validateEmail';
import { BaseProposalDto } from '../../proposal/dto/base.dto';
import { BaseFundDto } from '../../fund/dto/base.dto';
import { BaseChallengeDto } from '../../challenge/dto/base.dto';
import { BaseProposerDto } from '../../proposer/dto/base.dto';

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
  const filteredData = data
    .filter((item) => item[0])
    .map((item) => item.map((item) => item.trim()));
  return filteredData.map((item) => {
    const record = {} as BaseFundDto;
    record.name = item[0];
    record.description = item[4];
    record.currency =
      item[2] && ['usd', 'ada'].includes(item[2]) ? item[2] : 'usd';
    record.budget =
      item[1] && parseInt(item[1] as string) ? parseInt(item[1] as string) : 0;
    record.date = moment(item[3], 'MM-DD-YYYY').isValid()
      ? moment(item[3], 'MM-DD-YYYY').toDate()
      : moment().toDate();
    return lodash.omitBy(record, lodash.isNil);
  });
};

const proposerTransform = (data: any[]) => {
  const filteredData = data
    .filter((item) => item[0] && item[1] && validateEmail(item[1]))
    .map((item) => item.map((item) => item.trim()));
  return filteredData.map((item) => {
    const record = {} as BaseProposerDto;
    [
      record.fullName,
      record.email,
      record.telegram,
      record.walletAddress,
      record.description,
    ] = item;
    return lodash.omitBy(record, lodash.isNil);
  });
};

const challengeTransform = async (data: any[], fundService) => {
  const filteredData = data
    .filter((item) => item[0] && item[1])
    .map((item) => item.map((item) => item.trim()));
  return await Promise.all(
    filteredData.map(async (item) => {
      const record = {} as BaseChallengeDto;
      const nullFundId = new Types.ObjectId().toString();
      record.name = item[0];
      record.fundId = lodash.get(
        await fundService.findByName(item[1]),
        '_id',
        nullFundId,
      );
      record.description = item[3];
      record.budget =
        item[2] && parseInt(item[2] as string)
          ? parseInt(item[2] as string)
          : 0;
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
  const filteredData = data
    .filter((item) => item[0] && item[1] && item[2] && item[3] && item[4])
    .map((item) => item.map((item) => item.trim()));
  return await Promise.all(
    filteredData.map(async (item) => {
      const record = {} as BaseProposalDto;
      const nullId = new Types.ObjectId().toString();
      let fundName,
        proposerName,
        challengeName,
        requestedBudgetStr: string,
        startDateStr,
        completeDateStr;

      [
        record.projectId,
        record.name,
        fundName,
        challengeName,
        proposerName,
        requestedBudgetStr,
        record.projectStatus,
        record.proposalUrl,
        // record.gitLink,
       // record.gitLinks,
        record.walletAddress,
        record.smartContract,
        record.previousProposals,
        startDateStr,
        completeDateStr,
        record.description,
      ] = item;

      record.fundId = lodash.get(
        await fundService.findByName(fundName),
        '_id',
        nullId,
      );
      record.challengeId = lodash.get(
        await challengeService.findByName(record.fundId, challengeName),
        '_id',
        nullId,
      );
      record.proposerId = lodash.get(
        await proposerService.findByName(proposerName),
        '_id',
        nullId,
      );
      record.requestedBudget =
        requestedBudgetStr && parseInt(requestedBudgetStr)
          ? parseInt(requestedBudgetStr)
          : 0;

      record.startDate = moment(startDateStr, 'MM-DD-YYYY').isValid()
        ? moment(startDateStr, 'MM-DD-YYYY').toDate()
        : moment().toDate();
      record.completeDate = moment(completeDateStr, 'MM-DD-YYYY').isValid()
        ? moment(completeDateStr, 'MM-DD-YYYY').toDate()
        : moment().toDate();

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
