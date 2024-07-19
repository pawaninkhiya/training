import mongoose, { Schema, Types } from "mongoose";

interface ISUBSCRIBER {
  subscribers: Types.ObjectId;
  channel: Types.ObjectId;
}

const subscriptionSchema = new Schema<ISUBSCRIBER>(
  {
    subscribers: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    channel: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Subscription = mongoose.model("Subscription", subscriptionSchema);
