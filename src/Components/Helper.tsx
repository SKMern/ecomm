export const validate = (data: any, error: any) => {
  let valid: boolean = true;
  Object.values(data).forEach((it) => !it && (valid = false));
  Object.values(error).forEach((it) => it && (valid = false));

  return valid;
};
