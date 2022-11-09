import { promises as fs } from 'fs';
import * as path from 'path';
import * as process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';

/*
const result = await getSheetData('1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', 'A2:E')
*/

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
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

const getSheetData = async (spreadsheetId, range) => {
  const auth = await authorize();
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `Class Data!${range}`,
  });
  return res.data.values;
};

export { getSheetData };
