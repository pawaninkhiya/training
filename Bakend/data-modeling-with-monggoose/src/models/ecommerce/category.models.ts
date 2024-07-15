import { model, Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: String;
}
const categorySechma = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Category = model<ICategory>("Category", categorySechma);
