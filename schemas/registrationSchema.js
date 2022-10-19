import * as yup from "yup";

const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Обов'язкове поле")
    .min(3, "Мінімум 3 літери")
    .max(30, "Максимум 30 символів")
    .trim(),
  email: yup
    .string()
    .email("приклад: example@gmail.com")
    .required("Обов'язкове поле")
    .max(50, "Максимум 50 символів")
    .trim(),
  password: yup
    .string()
    .required("Обов'язкове поле")
    .min(8, "Мінімум 8 символів"),
});

export default registrationSchema;
