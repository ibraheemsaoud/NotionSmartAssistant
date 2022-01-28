"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDateFormat = void 0;
const date_fns_1 = require("date-fns");
const validateDateFormat = (dateFormat, fieldName) => {
    try {
        (0, date_fns_1.format)(new Date(), dateFormat);
    }
    catch (e) {
        return {
            field: fieldName,
            message: "date format is not a valid format",
        };
    }
    return true;
};
exports.validateDateFormat = validateDateFormat;
//# sourceMappingURL=dateAndTime.js.map