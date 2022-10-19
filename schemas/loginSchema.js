import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    // .email("приклад: example@gmail.com")
    .required("Обов'язкове поле")
    // .max("Максимум 50 символів")
    .trim(),
  password: yup.string().required("Обов'язкове поле").trim(),
  // .min(8, "Мінімум 8 символів"),
});

export default loginSchema;
