import { Document, model, Schema, Types } from "mongoose";

interface ISubTodo extends Document {
  content: string;
  complete: boolean;
  createdBy: Types.ObjectId;
}
const subTodoSchma = new Schema<ISubTodo>(
  {
    content: {
      type: String,
    },
    complete: {
      type: Boolean,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const SubTodo = model("SubTodo", subTodoSchma);
