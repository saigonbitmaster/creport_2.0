const project_id = process.env.BLOCKFROST_PROJECT_ID;
const blockfrost_url = process.env.BLOCKFROST_URL;
import axios from 'axios';
import { addressUtxo } from '../types';

export async function getAddressUtxos(address: string) {
  let result = [];
  await axios
    .get<any>(`${blockfrost_url}/addresses/${address}/utxos`, {
      headers: {
        project_id: project_id,
      },
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
      result = response.data;
    })
    .catch((error) => error);

  return result;
}

export async function getUtxUtxos(tx_hash: string) {
  let result = [];

  await axios({
    url: `${blockfrost_url}/txs/${tx_hash}/utxos`,
    method: 'GET',
    headers: {
      project_id: project_id,
    },
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
      result = response.data;
    })
    .catch((error) => error);

  return result;
}
