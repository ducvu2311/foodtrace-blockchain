const Tesseract = require('tesseract.js');
const { getPool } = require('../config/db.config');
const blockchain = require('../services/blockchainService');

async function runOCR(filePath) {
  const result = await Tesseract.recognize(filePath, 'eng+vie');
  return result.data.text || '';
}

exports.uploadLabTest = async (req, res) => {
  try {
    const file = req.file;
    const batchId = req.body.batch_id || null;

    const ocrText = await runOCR(file.path);

    const block = blockchain.addBlock({
      type: 'lab_test',
      file: file.filename,
      ocr_text_snippet: ocrText.slice(0, 150)
    });

    const [insert] = await db.execute(
      `INSERT INTO lab_tests (batch_id, certificate_file_url, ocr_text, blockchain_hash)
       VALUES (?,?,?,?)`,
      [batchId, file.path, ocrText, block.hash]
    );

    res.json({
      ok: true,
      lab_test_id: insert.insertId,
      ocrText,
      hash: block.hash
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.uploadFarmDocument = async (req, res) => {
  try {
    const file = req.file;
    const farmId = req.body.farm_id || null;
    const docType = req.body.doc_type || null;

    const ocrText = await runOCR(file.path);

    const block = blockchain.addBlock({
      type: 'farm_document',
      file: file.filename,
      doc_type: docType,
      ocr_text_snippet: ocrText.slice(0, 150)
    });

    const [insert] = await db.execute(
      `INSERT INTO farm_documents (farm_id, doc_type, file_url, ocr_text, blockchain_hash)
       VALUES (?,?,?,?,?)`,
      [farmId, docType, file.path, ocrText, block.hash]
    );

    res.json({
      ok: true,
      doc_id: insert.insertId,
      ocrText,
      hash: block.hash
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
