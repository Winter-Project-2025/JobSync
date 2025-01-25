import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { gemini_schema } from "../models/gemini_schema.model.js";
import fs from 'fs'
import 'dotenv/config'

export async function gemini_data(filename) {
    const data = fs.readFileSync(`${filename}`, { encoding: 'utf-8' });

    fs.unlinkSync(filename);

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

    const resume_data = JSON.parse(result.response.text());
    return resume_data
}

