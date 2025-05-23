import { APIError } from "../utils/error.util.js";
import { Error as ErrorNamespace } from "mongoose";
export const errorMiddleware = (error, req, res, _next) => {
    var _a;
    console.log("An error occurred: ", error);
    if (error instanceof ErrorNamespace.ValidationError) {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        res.status(400).json({
            success: false,
            message: error.message,
            errors,
        });
        return;
    }
    if (error instanceof ErrorNamespace) {
        let errors = {};
        res.status(400).json({
            success: false,
            message: error.message,
        });
        return;
    }
    if (error instanceof APIError) {
        res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : (Number(error.status) || 400)).json(Object.assign({ success: false }, error.body));
        return;
    }
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};
