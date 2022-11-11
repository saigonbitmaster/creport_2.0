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
    const name = item[0];
    const description = item[4] || null;
    const currency =
      item[2] && ['usd', 'ada'].includes(item[2]) ? item[2] : 'usd';
    const budget =
      item[1] && parseInt(item[1] as string) ? parseInt(item[1] as string) : 0;
    const date = moment(item[3], 'MM-DD-YYYY').isValid()
      ? moment(item[3], 'MM-DD-YYYY').toDate()
      : moment().toDate();

    return { name, currency, budget, date, description };
  });
};

const proposerTransform = (data: any[]) => {
  const filteredData = data.filter(
    (item) => item[0] && item[1] && validateEmail(item[1]),
  );
  return filteredData.map((item) => {
    const fullName = item[0];
    const email = item[1];
    const telegram = item[2] || null;
    const walletAddress = item[3] || null;
    const description = item[4] || null;
    return { fullName, email, telegram, walletAddress, description };
  });
};

const challengeTransform = async (data: any[], fundService) => {
  const filteredData = data.filter((item) => item[0] && item[1]);
  return await Promise.all(
    filteredData.map(async (item) => {
      const name = item[0];
      const fund = item[1];
      const fundRecord = await fundService.findByName(fund);
      const nullFundId = new Types.ObjectId().toString();
      const fundId = lodash.get(fundRecord, '_id', nullFundId);
      const description = item[3] || null;
      const budget =
        item[2] && parseInt(item[2] as string)
          ? parseInt(item[2] as string)
          : 0;

      return { name, fundId, budget, description };
    }),
  );
};

export { getSheetData, fundTransform, challengeTransform, proposerTransform };
