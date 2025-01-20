import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import 'dotenv/config'


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


export const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) alert('File should be uploaded!!')
        const response = await cloudinary.uploader
            .upload(
                filePath, {
                resource_type: 'auto'
            }
            )
        fs.unlinkSync(filePath)
        console.log("File hasd been uploaded on CLOUDINARY!!!!");
        console.log(response);
        return response;
    } catch (error) {
        fs.unlinkSync(filePath)
        return null
    }
}