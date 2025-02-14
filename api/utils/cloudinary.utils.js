import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from 'dotenv'

dotenv.config()
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!fs.existsSync(localFilePath)) {
      console.error("File does not exist:", localFilePath);
      return null;
    }

    const response = await cloudinary.uploader.upload(
      path.resolve(localFilePath), // Fix Windows path issue
      { resource_type: "auto" }
    );

    console.log("Successfully uploaded on Cloudinary", response.url);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default uploadOnCloudinary;