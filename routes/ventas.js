const express = require('express');
const router = express.Router();
const excelHandler = require('../handlers/excelHandler');
const pdfHandler = require('../handlers/pdfHandler');

router.post('/excel', excelHandler.handleVentasExcel);
router.post('/pdf', pdfHandler.handleVentasPDF);

module.exports = router;
