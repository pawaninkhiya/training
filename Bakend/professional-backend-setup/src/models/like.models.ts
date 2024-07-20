import mongoose, { Schema, Types } from "mongoose";

interface ILike {
  comment: Types.ObjectId;
  video: Types.ObjectId;
  likedBy: Types.ObjectId;
  tweet: Types.ObjectId;
}
const likeSchema = new Schema<ILike>(
  {
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  },
  { timestamps: true }
);
export const Like = mongoose.model<ILike>("Like", likeSchema);
