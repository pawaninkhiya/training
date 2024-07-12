import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
    name: string;
    description: string;
}

const UserSchema = new mongoose.Schema<UserDocument>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const UserModel = mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;
