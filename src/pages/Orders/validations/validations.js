import * as yup from "yup";
const validations = yup.object().shape({
  slides: yup.string().required("validationMessages.required"),
});

export default validations;
