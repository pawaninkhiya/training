"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleWare = void 0;
const errorMiddleWare = (err, req, resp, next) => {
    return resp.status(400).json({
        succuss: true,
        message: "Some Error",
    });
};
exports.errorMiddleWare = errorMiddleWare;
