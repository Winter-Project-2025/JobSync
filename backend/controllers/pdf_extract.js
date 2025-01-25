import fs from "fs";
import PDFParser from "pdf2json";

export const pdf_parser = (filepath,filename) => {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);

        pdfParser.on("pdfParser_dataError", (errData) => {
            console.error(errData.parserError);
            reject(errData.parserError); // Reject on error
        });

        pdfParser.on("pdfParser_dataReady", (pdfData) => {
            const outputPath = `public/temp/${filename}.txt`;
            fs.writeFile(outputPath, pdfParser.getRawTextContent(), (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    reject(err); // Reject if file writing fails
                } else {
                    console.log("Done writing PDF data.");
                    resolve(outputPath); // Resolve with the output file path
                }
            });
        });

        // Start loading the PDF
        pdfParser.loadPDF(filepath);
    });
};
