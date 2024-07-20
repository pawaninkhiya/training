import { error } from "console";
import { Video } from "../models/video.models";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import ApiResponse from "../utils/EpiResponse";

const getAllVideos = asyncHandler(async (req: Request, resp: Response) => {
  const videos = await Video.find();    
  if (!videos) throw new ApiError(404, "No videos found");
  resp
    .status(200)
    .json(new ApiResponse(200, videos, "videos fetched succusfully"));

});

const publishVideo = asyncHandler(async (req: Request, resp: Response) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return resp.status(400).json({ message: "Please provide all the fields" });
  }
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log(files);

});


export {
    getAllVideos,
    publishVideo
}