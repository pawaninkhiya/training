// import { Document, FilterQuery, UpdateQuery, QueryOptions, DocumentDefinition } from "mongoose";
import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";

import UserModel, { UserDocument } from "../models/user.models";

export const createUser = (input: { name: string, description: string }) => {
    return UserModel.create(input);
};

export const findUser = (query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) => {
    return UserModel.find(query, {}, options);
};

// export const updateUser = (query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions = {}) => {
//     return UserModel.findByIdAndUpdate(query, update, { new: true, ...options });
// };
export const updateUser = (query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions = {}) => {
    return UserModel.findOneAndUpdate(query, update, { new: true, ...options });
};


export const deleteUser = (query: FilterQuery<UserDocument>) => {
    return UserModel.deleteOne(query);
};
