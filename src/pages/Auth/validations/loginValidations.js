import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email giriniz.")
    .required("Zorunlu Alan"),
  password: yup
    .string()
    .min(8, "Parolan 8 karakterden uzun olmalı.")
    .max(20, "Parolan 20 karakterden kısa olmalı.")
    .required("Zorunlu Alan"),
});

export default validations;
