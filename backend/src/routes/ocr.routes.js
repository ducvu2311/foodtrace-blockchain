const router = require('express').Router();
const upload = require('../middleware/upload');
const ctrl = require('../controllers/ocrController');

router.post('/lab/upload', upload.single('file'), ctrl.uploadLabTest);
router.post('/farm/upload', upload.single('file'), ctrl.uploadFarmDocument);

module.exports = router;
