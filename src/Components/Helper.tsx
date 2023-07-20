
export const validate = (data: any, error: any) => {
  let valid: boolean = true;
  Object.values(data).forEach((it) => !it && (valid = false));
  Object.values(error).forEach((it) => it && (valid = false));

  return valid;
};

export const productSchema = {
  category: "",
  description: "",
  id: 0,
  _id: "",
  image: "",
  price: 0,
  rating: { rate: 0, count: 0 },
  title: "",
};
