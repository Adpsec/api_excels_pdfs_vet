const express = require('express');
const router = express.Router();
const excelHandler = require('../handlers/excelHandler');
const pdfHandler = require('../handlers/pdfHandler');

router.post('/excel', excelHandler.handleProductosExcel);
router.post('/pdf', pdfHandler.handleProductosPDF);

module.exports = router;
