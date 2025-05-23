var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { APIError } from "../utils/error.util.js";
import { formatJoiError } from "../utils/error.util.js";
import { getNestedValue, normalizeSearchParams } from "../utils/index.util.js";
import { setNestedValue } from "../utils/index.util.js";
class ValidationMiddleware {
    validate(validationOptions) {
        validationOptions = Array.isArray(validationOptions)
            ? validationOptions
            : [validationOptions];
        return (req, _res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const requestObject = req;
            for (const option of validationOptions) {
                const value = getNestedValue(requestObject, option.path);
                const isRequired = (_a = option.required) !== null && _a !== void 0 ? _a : true;
                if (!isRequired && value === undefined)
                    continue;
                if (option.schema) {
                    const validatedValue = yield this.validateJoiSchema(option.schema, value);
                    if (option.path === "query") {
                        const [oldUrl, oldQuery] = requestObject.url.split("?");
                        const newQuery = new URLSearchParams(normalizeSearchParams(validatedValue));
                        requestObject.url = `${oldUrl}?${newQuery.toString()}`;
                    }
                    else {
                        setNestedValue(requestObject, option.path, validatedValue);
                    }
                }
            }
            next();
        });
    }
    validateJoiSchema(schema, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield schema.validateAsync(data, {
                    abortEarly: false,
                    stripUnknown: true,
                });
                return value;
            }
            catch (error) {
                throw new APIError("BAD_REQUEST", {
                    message: "Validation Error",
                    errors: formatJoiError(error),
                });
            }
        });
    }
}
export const validationMiddleware = new ValidationMiddleware();
