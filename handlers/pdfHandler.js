const PDFDocument = require('pdfkit');
const admin = require('firebase-admin');
const bucket = admin.storage().bucket();

const Venta = require('../models/Venta');

async function handleVentasPDF(req, res) {
    try {
        if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({ error: 'Datos de ventas no válidos.' });
        }

        const pdfBuffer = [];
        const pdfDoc = new PDFDocument();

        pdfDoc.on('data', chunk => {
            pdfBuffer.push(chunk);
        });

        pdfDoc.on('end', async () => {
            const pdfFileName = `ventas_${Date.now()}.pdf`;
            const pdfFile = bucket.file(pdfFileName);
            await pdfFile.save(Buffer.concat(pdfBuffer), {
                metadata: { contentType: 'application/pdf' },
                public: true
            });

            const pdfUrl = `https://storage.googleapis.com/${bucket.name}/${pdfFileName}`;

            res.status(200).json({ pdfUrl });
        });

        // Agregar datos al PDF
        req.body.forEach(venta => {
            pdfDoc.text(`ID_Venta: ${venta.ID_Venta}`);
            pdfDoc.text(`Fecha_Venta: ${venta.Fecha_Venta}`);
            pdfDoc.text(`ID_Vendedor: ${venta.ID_Vendedor}`);
            pdfDoc.text(`Importe_Total: ${venta.Importe_Total}`);
            pdfDoc.text(`Subtotal: ${venta.Subtotal}`);
            pdfDoc.text(`IVA: ${venta.IVA}`);
            pdfDoc.text(`ID_Sucursal: ${venta.ID_Sucursal}`);
            pdfDoc.text(`---------------------------`);
        });

        pdfDoc.end();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

async function descargarPDF(req, res) {
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
    handleVentasPDF,
    descargarPDF
};
