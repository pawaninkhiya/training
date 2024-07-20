import mongoose, { Schema, Types } from "mongoose";

interface IPlaylist {
  name: string;
  description: string;
  videos: Types.ObjectId[];
  owner: Types.ObjectId;
}
const playlistSchema = new Schema<IPlaylist>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const Playlist = mongoose.model<IPlaylist>("Playlist", playlistSchema);
