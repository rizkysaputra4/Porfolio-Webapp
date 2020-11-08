const Joi = require("joi-browser");

const registerValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(4).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(4).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(4).required().email({ minDomainAtoms: 2 }),
    password: Joi.string().min(4).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
