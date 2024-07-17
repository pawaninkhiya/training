
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDNINARY_CLOUD_NAME,
  api_key: process.env.CLOUDNINARY_API_KEY,
  api_secret: process.env.CLOUDNINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string): Promise<any> => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Log success message
    console.log("File uploaded to Cloudinary");

    return response; // Return Cloudinary's response object
  } catch (error) {
    // Handle upload failure
    console.error("Error uploading file to Cloudinary:", error);

    // Clean up: Delete local temporary file
    fs.unlinkSync(localFilePath);

    return null; // Return null on error
  }
};

export default uploadOnCloudinary;

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// // Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDNINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDNINARY_API_KEY,
//   api_secret: process.env.CLOUDNINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
// });

// const uploadOnCloudinery = async (localFilePath: string): Promise<any> => {
//   try {
//     if (!localFilePath) return null;
//     // upload the file on cloudinery
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     return response
//     // file has been uploaded sccussfully
//     console.log("file is uploaded cloudinary");
//   } catch (error) {
//     fs.unlinkSync(localFilePath); // remove the localy saved temporary  file as the upload  operation got failed
//     return null;
//   }
// };

// export default uploadOnCloudinery;

// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// // Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// // Define the response type from Cloudinary
// interface CloudinaryUploadResponse {
//   secure_url: string;
//   public_id: string;
//   [key: string]: any;
// }

// const uploadOnCloudinary = async (localFilePath: string): Promise<CloudinaryUploadResponse | null> => {
//   try {
//     if (!localFilePath) {
//       throw new Error('Local file path is required');
//     }

//     // Upload the file to Cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: 'auto',
//     }) as CloudinaryUploadResponse;

//     console.log('File uploaded to Cloudinary successfully');
//     console.log('Cloudinary Response:', response);

//     // Remove the local file after successful upload
//     fs.unlinkSync(localFilePath);

//     return response;
//   } catch (error) {
//     console.error('Error uploading to Cloudinary:', error);

//     // Remove the local file if the upload operation failed
//     if (fs.existsSync(localFilePath)) {
//       fs.unlinkSync(localFilePath);
//     }

//     return null;
//   }
// };

// export default uploadOnCloudinary;
