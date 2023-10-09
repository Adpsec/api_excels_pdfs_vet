const exceljs = require('exceljs');
const admin = require('firebase-admin');
const bucket = admin.storage().bucket();

const Venta = require('../models/Venta');

async function handleVentasExcel(req, res) {
    try {
        if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({ error: 'Datos de ventas no válidos.' });
        }

        const ventasData = req.body.map(venta => new Venta(
            venta.ID_Venta,
            venta.Fecha_Venta,
            venta.ID_Vendedor,
            venta.Importe_Total,
            venta.Subtotal,
            venta.IVA,
            venta.ID_Sucursal
        ));

        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Ventas');

        worksheet.columns = [
            { header: 'ID_Venta', key: 'ID_Venta' },
            { header: 'Fecha_Venta', key: 'Fecha_Venta' },
            { header: 'ID_Vendedor', key: 'ID_Vendedor' },
            { header: 'Importe_Total', key: 'Importe_Total' },
            { header: 'Subtotal', key: 'Subtotal' },
            { header: 'IVA', key: 'IVA' },
            { header: 'ID_Sucursal', key: 'ID_Sucursal' }
        ];

        ventasData.forEach(venta => {
            worksheet.addRow(venta);
        });

        const excelBuffer = await workbook.xlsx.writeBuffer();
        const excelFileName = `ventas_${Date.now()}.xlsx`;
        const excelFile = bucket.file(excelFileName);
        await excelFile.save(excelBuffer, {
            metadata: { contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
            public: true
        });

        const excelUrl = `https://storage.googleapis.com/${bucket.name}/${excelFileName}`;

        res.status(200).json({ excelUrl });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

async function descargarExcel(req, res) {
    try {
        const nombreArchivo = req.params.nombreArchivo;
        const file = bucket.file(nombreArchivo);

        const stream = file.createReadStream();
        stream.pipe(res);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

module.exports = {
    handleVentasExcel,
    descargarExcel
};
