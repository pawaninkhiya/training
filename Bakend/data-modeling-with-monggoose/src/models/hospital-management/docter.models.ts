import { model, Schema, Types } from "mongoose";

interface IDocter extends Document {
  name: string;
  sallery: number;
  qualification: string;
  experienceInYears: number;
  worksInHospitals: Types.ObjectId;
}
const docterSchema = new Schema<IDocter>(
  {
    name: {
      type: String,
      required: true,
    },
    sallery: {
      type: Number,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    experienceInYears: {
      type: Number,
      required: true,
      default: 0,
    },
    worksInHospitals: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
  },
  { timestamps: true }
);
export const Docter = model<IDocter>("Docter", docterSchema);
