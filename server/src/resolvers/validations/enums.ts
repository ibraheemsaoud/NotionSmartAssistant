import { FieldError } from "../types";

export const validateEnum = <T>(
  enumName: any,
  fieldName: string,
  value: T
): true | FieldError => {
  if (!Object.values(enumName).includes(value)) {
    return {
      field: fieldName,
      message: `${fieldName} not found`,
    };
  }
  return true;
};
