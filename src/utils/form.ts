import * as yup from "yup";

export type LoginValues = {
  email: string;
  password: string;
};

export const loginSchema = yup.object({
  email: yup.string().required("Ce champ est obligatoire"),
  password: yup.string().required("Ce champ est obligatoire"),
});
