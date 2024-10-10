const yup = require('yup')

const articleSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "at least char is 3")
    .max(250, "max char is 250")
    .required("name field is required"),
  content: yup
    .string()
    .min(3, "at least char is 3")
    .required("username field is required"),
  tags: yup
    .mixed()
    .test(
      "is-string-or-array",
      "Tags must be a string or an array of strings",
      (value) => {
        return (
          typeof value === "string" ||
          (Array.isArray(value) &&
            value.every((item) => typeof item === "string"))
        );
      }
    )
    .required("tags is required"),
});

module.exports = articleSchema