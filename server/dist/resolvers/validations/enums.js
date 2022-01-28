"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnum = void 0;
const validateEnum = (enumName, fieldName, value) => {
    if (!Object.values(enumName).includes(value)) {
        return {
            field: fieldName,
            message: `${fieldName} not found`,
        };
    }
    return true;
};
exports.validateEnum = validateEnum;
//# sourceMappingURL=enums.js.map