import express, { NextFunction, Request, Response } from "express";
import { z } from "zod/v4";
import { APIError } from "../utils/error.util.js";

interface Validator {
  path: "query" | "body" | "params";
  schema: z.ZodType<any>;
}

// Generic middlewares
export const appMiddlewareRoute = express.Router();
appMiddlewareRoute.use(express.json());
appMiddlewareRoute.use(express.urlencoded({ extended: true }));

// Validator middleware
export function validator(validator: Validator) {
  const { path, schema } = validator;

  return async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = await validateZodSchema(schema, req[path]);

    if (path === "query") {
      const [oldUrl, _oldQuery] = (req.url as string).split("?");
      const newQuery = new URLSearchParams(validatedData);
      req.url = `${oldUrl}?${newQuery.toString()}`;
    } else {
      req[path] = validatedData;
    }

    next();
  };
}

async function validateZodSchema(
  schema: z.ZodType<any>,
  unvalidatedData: unknown
) {
  {
    const { success, error, data } = await schema.safeParseAsync(
      unvalidatedData
    );

    if (!success) {
      throw new APIError("BAD_REQUEST", {
        message: "Validation Error",
        error: error.issues.reduce((acc: Record<string, string>, issue) => {
          const hasValue = acc[issue.path.join(".")];
          if (hasValue) {
            acc[issue.path.join(".")] = `${hasValue}, ${issue.message}`;
          } else {
            acc[issue.path.join(".")] = issue.message;
          }
          return acc;
        }, {}),
        errorMessage: z.prettifyError(error),
      });
    }

    return data;
  }
}
