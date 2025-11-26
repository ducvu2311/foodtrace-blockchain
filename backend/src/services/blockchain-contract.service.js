const { contract } = require("../config/blockchain");

class BlockchainContractService {
  async getBatchHash(batch_id, proof_hash) {
    let onChainHash = null;
    let onChainTime = null;
    let verified = false;

    try {
      const result = await contract.getBatchHash(batch_id);
      console.log(`getBatchHash() result for batch_id=${batch_id}: `, result);
      onChainHash = String(result[0]);
      onChainTime = Number(result[1]);
      verified = proof_hash === onChainHash;
    } catch (err) {
      console.warn("⚠️ Không thể xác minh blockchain:", err.message);
    }

    return { onChainHash, onChainTime, verified };
  }
}

module.exports = new BlockchainContractService();
