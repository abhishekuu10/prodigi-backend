const yup = require("yup");

const userSchema = yup.object().shape({
  name: yup.string().min(3, "to short").max(40).required("name is required"),
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .min(5, "password is less than 5 words")
    .max(100, " too large password"),
});

const wishlistSchema = yup.object().shape({
  listName: yup
    .string()
    .min(2, "to short")
    .max(40)
    .required("wish list name is required"),
});

const userValidator = async function (body) {
  try {
    await userSchema.validate(body);
    return {
      status: true,
      msg: "validated successfully",
    };
  } catch (err) {
    return {
      msg: err.message,
    };
  }
};

const wishlistValidator = async function (body) {
  try {
    await wishlistSchema.validate(body);
    return {
      status: true,
      msg: "validated successfully",
    };
  } catch (err) {
    return {
      msg: err.message,
    };
  }
};

module.exports = { userValidator, wishlistValidator };
