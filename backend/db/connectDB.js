import 'dotenv/config';
import mongoose from 'mongoose';
import { resume_details } from '../models/resume_details.model.js';
import { resume_object } from './resume_db_object.js';
import { MONGODB_NAME } from '../utils/constants.js';



export async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${MONGODB_NAME}`);
    console.log(`MongoDB Connected Successfully !!!`);
  } catch (error) {
    console.error("Error in connecting MongoDB: " + error);
  }
}


export async function addData(filename) {
  try {
    const resume_data_object = await resume_object(filename);
    const data = await resume_details.create(resume_data_object);

    console.log("Data added successfully:", data);
  } catch (error) {
    console.error("Error adding data: ", error);
  }
}


