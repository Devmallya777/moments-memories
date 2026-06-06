const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const router = express.Router();

router.post('/', async (req, res) => {

    const {
        customerName,
        product,
        amount
    } = req.body;

    const doc = new PDFDocument();

    const fileName = `invoice-${Date.now()}.pdf`;

    const filePath = `public/invoices/${fileName}`;

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(25)
       .text('Moments & Memories Invoice');

    doc.moveDown();

    doc.fontSize(18)
       .text(`Customer: ${customerName}`);

    doc.text(`Product: ${product}`);

    doc.text(`Amount: ₹${amount}`);

    doc.end();

    res.json({
        success: true,
        invoice: fileName
    });

});

module.exports = router;
