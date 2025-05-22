import express from "express";
import { z } from "zod/v4";
import { APIError } from "../utils/error.util.js";
// Generic middlewares
export const appMiddlewareRoute = express.Router();
appMiddlewareRoute.use(express.json());
appMiddlewareRoute.use(express.urlencoded({ extended: true }));
export function validator(validator) {
    return async (req, res, next) => {
        console.log(req[validator.path], req.body);
        await validateZodSchema(validator.schema, req[validator.path]);
        // next();
        res.json(req.body);
    };
}
async function validateZodSchema(schema, unvalidatedData) {
    {
        const { success, error, data } = await schema.safeParseAsync(unvalidatedData);
        if (!success) {
            throw new APIError("BAD_REQUEST", {
                message: error.message,
                errorMessage: z.prettifyError(error),
            });
        }
        return data;
    }
}
