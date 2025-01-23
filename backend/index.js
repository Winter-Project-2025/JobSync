import dotenv from 'dotenv/config';
import { uploadOnCloudinary } from './controllers/cloudinary.js';
import express from 'express';
import { upload } from './middlewares/multer.middleware.js';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import path from 'node:path';
import {pdf_parser} from './controllers/pdf_extract.js'

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../frontend') });
});

app.post('/profile', upload.single('avatar'), async (req, res) => {
    console.log(req.file.path)
    try {
        pdf_parser(req.file.path)
        const url = await uploadOnCloudinary(req.file.path)
        res.status(201).send('Profile created successfully!');
    } catch (error) {
        console.error("Cloudinary Error : " + error)
    }
    
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});