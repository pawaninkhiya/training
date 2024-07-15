import { model, Schema } from "mongoose";

const medicalRecordSchema = new Schema({}, { timestamps: true });
export const ModicalRecord = model("MedicalRecord", medicalRecordSchema);
