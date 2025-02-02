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

export async function input_fields_gemini(data) {
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
        `You are a highly skilled information extraction AI.I will provide you the data which contains various input fields of an HTML code.Your task is to analyze each input field and based on your analysis, give me full id in string for each input field based on the given schema.It may be possible that id does not contain the required information. In that case, analyze the whole input field and based on your analysis, give me full id in string for given schema. If the input field is not available, give it a null value. The data is :- 
    
    ${data}
    
    `
    );

    const resume_data = JSON.parse(result.response.text());
    
    return resume_data;
    
}