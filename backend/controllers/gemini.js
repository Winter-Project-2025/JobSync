import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { gemini_schema } from "../models/gemini_schema.model.js";
import fs from 'fs'
import 'dotenv/config'

const data = fs.readFileSync('public/temp/pdfdata.txt', { encoding: 'utf-8' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const schema = gemini_schema;

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
    },
});


const result = await model.generateContent(
    `You are a highly skilled information extraction AI. Your task is to provide the given data in the mentioned schema.All fields of the schema is required. The data is :- 
    
    ${data}
    
    `
);

export const resume_data = JSON.parse(result.response.text());