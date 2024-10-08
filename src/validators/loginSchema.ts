import * as yup from "yup";

const loginLocalSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "at least char is 3")
    .max(50, "max char is 50")
    .required("this field is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "format password is incorrect"
    )
    .required("this field is required"),
});


const captchaSchema = yup.object().shape({
  uuid: yup.string().uuid().required("this field is required"),
  captcha: yup.string().max(4).required("this field is required"),
})


export {loginLocalSchema,captchaSchema}