const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CHAIN_FILE = path.join(__dirname, '..', '..', 'backend_data', 'blockchain.json');

if (!fs.existsSync(path.dirname(CHAIN_FILE))) {
  fs.mkdirSync(path.dirname(CHAIN_FILE), { recursive: true });
}
if (!fs.existsSync(CHAIN_FILE)) {
  fs.writeFileSync(CHAIN_FILE, JSON.stringify([], null, 2));
}

function addBlock(data) {
  const chain = JSON.parse(fs.readFileSync(CHAIN_FILE));
  const prevHash = chain.length ? chain[chain.length - 1].hash : '0';

  const block = {
    index: chain.length,
    timestamp: new Date().toISOString(),
    data,
    prevHash
  };

  block.hash = crypto.createHash('sha256')
    .update(JSON.stringify(block))
    .digest('hex');

  chain.push(block);

  fs.writeFileSync(CHAIN_FILE, JSON.stringify(chain, null, 2));
  return block;
}

module.exports = { addBlock };
