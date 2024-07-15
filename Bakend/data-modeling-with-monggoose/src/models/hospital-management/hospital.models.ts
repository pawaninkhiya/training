import { model, Schema } from "mongoose";

interface IHospital extends Document {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  pincode: string;
  specialLizedIn: string[];
}
const hospitalSchema = new Schema<IHospital>(
  {
    name: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    specialLizedIn: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);
export const Hospital = model<IHospital>("Hospital", hospitalSchema);
