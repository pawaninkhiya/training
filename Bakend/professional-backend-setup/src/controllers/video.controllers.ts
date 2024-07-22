import { IVideo, Video } from "../models/video.models";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import ApiResponse from "../utils/EpiResponse";
import uploadOnCloudinary from "../utils/cloudinary";

const getAllVideos = asyncHandler(async (req: Request, resp: Response) => {
  const videos = await Video.find();
  if (!videos) throw new ApiError(404, "No videos found");
  resp
    .status(200)
    .json(new ApiResponse(200, videos, "videos fetched succusfully"));
});

const publishVideo = asyncHandler(async (req: Request, resp: Response) => {
  const { title, description } = req.body;
  if (!title && !description) {
    return resp.status(400).json({ message: "Please provide all the fields" });
  }
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const videoFileLocalPath = files.videoFile?.[0].path;
  const thumbnailFileLocalPath = files.thumbnail?.[0].path;
  if (!videoFileLocalPath) {
    throw new ApiError(400, "Video is required");
  }
  if (!thumbnailFileLocalPath) {
    throw new ApiError(400, "Thumbnail is required");
  }
  const videoFile = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailFileLocalPath);
  const video: Partial<IVideo> = await Video.create({
    title: title,
    videoFile: videoFile?.url,
    thumbnail: thumbnail?.url,
    description: description,
    duration: videoFile?.duration,
  });
  if (!video) {
    throw new ApiError(400, "Something went wrong while registering the user!");
  }
  resp
    .status(200)
    .json(new ApiResponse(200, video, "Video created succusfully"));
});

const getVideoById = asyncHandler(async (req: Request, resp: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Please provide id");
  }
  const video = await Video.findById(id);
  if (!video) throw new ApiError(404, "No video found");
  resp
    .status(200)
    .json(new ApiResponse(200, video, "video fetched succusfully"));
});

export { getAllVideos, publishVideo, getVideoById };
