import { model, Schema, Types } from "mongoose";

interface IPatient extends Document {
  name: string;
  diagnosedWith: string;
  address: string;
  age: number;
  bloodGroup: string;
  gender: "Male" | "Female" | "Other";
  admittedIn: Types.ObjectId;
}

const patientSchema = new Schema<IPatient>(
  {
    name: {
      type: String,
      required: true,
    },
    diagnosedWith: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    admittedIn: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
  },
  { timestamps: true }
);

export const Patient = model<IPatient>("Patient", patientSchema);
