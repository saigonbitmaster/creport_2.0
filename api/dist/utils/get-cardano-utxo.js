"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUtxUtxos = exports.getAddressUtxos = void 0;
const project_id = process.env.BLOCKFROST_PROJECT_ID;
const blockfrost_url = process.env.BLOCKFROST_URL;
const axios_1 = require("axios");
async function getAddressUtxos(address) {
    let result = [];
    await axios_1.default
        .get(`${blockfrost_url}/addresses/${address}/utxos`, {
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
exports.getAddressUtxos = getAddressUtxos;
async function getUtxUtxos(tx_hash) {
    let result = [];
    await (0, axios_1.default)({
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
exports.getUtxUtxos = getUtxUtxos;
//# sourceMappingURL=get-cardano-utxo.js.map