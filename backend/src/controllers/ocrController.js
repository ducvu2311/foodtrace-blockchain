const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { getPool } = require('../config/db.config');

// Helper: tạo hash SHA-256 từ file
function hashFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

// TODO: chỗ này bạn có thể gắn blockchain thật
async function saveHashToBlockchain(type, refId, hash) {
  console.log(
    `📦 [BLOCKCHAIN MOCK] type=${type}, refId=${refId}, hash=${hash}`
  );

  // Ví dụ sau này:
  // const { contract } = require('../config/blockchain');
  // const tx = await contract.storeOcrHash(type, refId, hash);
  // await tx.wait();
  // return tx.hash;

  return null; // tạm thời chưa trả về txHash
}

// -------- FARM DOCUMENT --------
exports.ocrFarmDocument = async (req, res) => {
  try {
    const { farmId, docType } = req.body;
    const file = req.file;

    if (!farmId || !docType || !file) {
      return res.status(400).json({ message: 'farmId, docType và file là bắt buộc' });
    }

    // Tạm thời chưa OCR thật, chỉ demo text
    // Bạn có thể gắn Tesseract hoặc dịch vụ OCR khác ở đây
    const ocrText = `OCR demo for file ${file.originalname}`;

    const hash = hashFile(file.path);

    const pool = await getPool();
    const [result] = await pool.execute(
      `INSERT INTO farm_documents (farm_id, doc_type, file_path, ocr_text, hash, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [farmId, docType, file.path, ocrText, hash]
    );

    const insertedId = result.insertId;

    // Ghi log blockchain (mock / hoặc bạn gắn contract thật)
    await saveHashToBlockchain('farm_document', insertedId, hash);

    res.json({
      id: insertedId,
      text: ocrText,
      hash
    });
  } catch (err) {
    console.error('❌ ocrFarmDocument error:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

exports.getFarmDocumentHistory = async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.execute(
      `SELECT id,
              farm_id    AS farmId,
              doc_type   AS docType,
              file_path  AS filePath,
              hash,
              created_at AS date
       FROM farm_documents
       ORDER BY created_at DESC
       LIMIT 100`
    );
    res.json(rows);
  } catch (err) {
    console.error('❌ getFarmDocumentHistory error:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// -------- LAB TEST --------
exports.ocrLabTest = async (req, res) => {
  try {
    const { batchId, docType } = req.body;
    const file = req.file;

    if (!batchId || !docType || !file) {
      return res.status(400).json({ message: 'batchId, docType và file là bắt buộc' });
    }

    const ocrText = `OCR demo for file ${file.originalname}`;
    const hash = hashFile(file.path);

    const pool = await getPool();
    const [result] = await pool.execute(
      `INSERT INTO lab_tests (batch_id, doc_type, file_path, ocr_text, hash, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [batchId, docType, file.path, ocrText, hash]
    );

    const insertedId = result.insertId;

    await saveHashToBlockchain('lab_test', insertedId, hash);

    res.json({
      id: insertedId,
      text: ocrText,
      hash
    });
  } catch (err) {
    console.error('❌ ocrLabTest error:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

exports.getLabTestHistory = async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.execute(
      `SELECT id,
              batch_id   AS batchId,
              doc_type   AS docType,
              file_path  AS filePath,
              hash,
              created_at AS date
       FROM lab_tests
       ORDER BY created_at DESC
       LIMIT 100`
    );
    res.json(rows);
  } catch (err) {
    console.error('❌ getLabTestHistory error:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
