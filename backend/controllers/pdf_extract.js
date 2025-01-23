import fs from "fs";
import PDFParser from "pdf2json";


export const pdf_parser = (filepath) => {
    const pdfParser = new PDFParser(this, 1);

    pdfParser.loadPDF(filepath);

    pdfParser.on("pdfParser_dataError", (errData) =>
        console.error(errData.parserError)
    );
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
        fs.writeFile(
            "public/temp/pdfdata.txt",
            pdfParser.getRawTextContent(),
            () => {
                console.log("Done.");
            }
        );
    });    
}
