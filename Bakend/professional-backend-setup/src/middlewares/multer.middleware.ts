import { Request, Express } from "express";
import multer, { StorageEngine } from "multer";

const storage: StorageEngine = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: Function) {
    cb(null, "./public/temp"); // Destination folder for uploaded files
  },
  filename: function (req: Request, file: Express.Multer.File, cb: Function) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });

export { upload };


// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp"); // Specify the destination directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original filename
//   },
// });

// const upload = multer({ storage: storage });

// export { upload };
