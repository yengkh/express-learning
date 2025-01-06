import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../../utils/constants.js";

passport.serializeUser((user, done) => {
  console.log("Inside serializeUser");
  console.log(user);

  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  console.log("Inside deserializeUser");
  console.log(`Deserializing ID: ${id}`);

  try {
    const findUser = users.find((user) => user.id === id);
    if (!findUser) throw new Error("User not found!");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    console.log("Username: ", username);
    console.log("Password: ", password);

    try {
      const findUser = users.find((user) => user.username === username);
      if (!findUser) throw new Error("User not found!");
      if (findUser.password !== password) throw new Error("Invalid password!");
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
