"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = void 0;
const user_models_1 = require("../models/user.models");
const newUser = async (req, resp, next) => {
    try {
        // return next();
        const { _id, name, email, gender, dob, photo } = req.body;
        const user = await user_models_1.User.create({
            _id,
            name,
            email,
            photo,
            gender,
            dob,
        });
        return resp.status(201).json({
            succuss: true,
            message: `Welcome ${user.name}`,
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({ succuss: 400, message: error });
    }
};
exports.newUser = newUser;
