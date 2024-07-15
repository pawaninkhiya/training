import { Schema, model, Document, Types } from "mongoose";

interface ITodo extends Document {
  content: string;
  complete: boolean;
  createdBy: Types.ObjectId;
  subTodos: Types.ObjectId[];
}
const todoSchema = new Schema<ITodo>(
  {
    content: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    subTodos: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubTodo",
      },
    ],
  },
  { timestamps: true }
);

export const Todo = model("Todo", todoSchema);
