import mongoose, { Schema, Types } from "mongoose";

interface ISUBSCRIBER {
  subscriber: Types.ObjectId;
  channel: Types.ObjectId;
}

const subscriptionSchema = new Schema<ISUBSCRIBER>(
  {
    subscriber: {
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
