import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (localFilePath: string): Promise<UploadApiResponse | null> => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export default uploadOnCloudinary



// import { v2 as cloudinary } from 'cloudinary';
// import { ApiError } from './ApiError';
// import fs from 'fs'

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (filePath: string) => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       resource_type:'auto'
//     });
//     return result;
//   } catch (error) {
//     console.error("Error uploading to Cloudinary:", error);
//     fs.unlinkSync(filePath) // remove the locally saved temporary file as the upload operation got failed
//     // throw new ApiError(500, "Failed to upload avatar to Cloudinary");
//     return null;
//   }
// };

// export default uploadOnCloudinary;