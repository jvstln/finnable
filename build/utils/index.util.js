export const getNestedValue = (object, path) => {
    const paths = path.split(".");
    let currentObject = object;
    paths.forEach((key) => {
        currentObject = currentObject === null || currentObject === void 0 ? void 0 : currentObject[key];
    });
    return currentObject;
};
export function setNestedValue(obj, path, value) {
    // Split the path into components
    const pathParts = path.split(".");
    // Start at the top level object
    let current = obj;
    // Traverse the path until the second-to-last part
    for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        // If the current path part doesn't exist or isn't an object, create it
        if (!current[part] || typeof current[part] !== "object") {
            current[part] = {};
        }
        // Move to the next level
        current = current[part];
    }
    // Set the value at the final path location
    current[pathParts[pathParts.length - 1]] = value;
    return obj;
}
export function normalizeSearchParams(obj) {
    const entries = [];
    for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
            value.forEach((val) => entries.push([key, val]));
        }
        else {
            entries.push([key, String(value)]);
        }
    }
    return entries;
}
