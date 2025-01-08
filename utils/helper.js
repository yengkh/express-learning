import bcrypt from "bcrypt";
const saltRounds = 10;

export const hassPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  console.log(salt);
  return bcrypt.hashSync(password, salt);
};

export const compairePassword = (plainPassword, hashPassword) =>
  bcrypt.compareSync(plainPassword, hashPassword);
