export const createUserValidationsSchema = {
  firstName: {
    isString: {
      errorMessage: "First name must be a string!",
    },
    isLength: {
      options: {
        min: 2,
        max: 10,
      },
      errorMessage: "First name must be between 2 and 10 characters!",
    },
    notEmpty: {
      errorMessage: "You must enter firstName!",
    },
  },
  lastName: {
    isString: {
      errorMessage: "Last name must be a string!",
    },
    notEmpty: {
      errorMessage: "You must enter lastName!",
    },
    isLength: {
      options: {
        min: 2,
        max: 10,
      },
      errorMessage: "Last name must be between 2 and 10 characters!",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Please enter a valid email address!",
    },
    notEmpty: {
      errorMessage: "You must enter email!",
    },
  },
  password: {
    notEmpty: true,
  },
};

export const checkUserInputEmailSchema = {
  email: {
    isEmail: {
      errorMessage: "Please enter a valid email address!",
    },
    notEmpty: {
      errorMessage: "You must enter email!",
    },
    isString: {
      errorMessage: "Email must be a string!",
    },
  },
};
