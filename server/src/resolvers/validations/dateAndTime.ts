import { FieldError } from "../types";
import { format } from "date-fns";

export const validateDateFormat = (
  dateFormat: string,
  fieldName: string
): true | FieldError => {
  try {
    format(new Date(), dateFormat);
  } catch (e) {
    return {
      field: fieldName,
      message: "date format is not a valid format",
    };
  }
  return true;
};
