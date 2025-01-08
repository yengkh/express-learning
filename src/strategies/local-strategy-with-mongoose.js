import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schema/user.js";
import { compairePassword } from "../../utils/helper.js";

passport.serializeUser((user, done) => {
  console.log("Inside serializeUser");
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Inside deserializeUser");
  console.log(`Deserializing ID: ${id}`);
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found!");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
export default passport.use(
  new Strategy({ usernameField: "email" }, async (username, password, done) => {
    try {
      const findUser = await User.findOne({ email: username });
      if (!findUser) throw new Error(`Could not find user`);
      if (!compairePassword(password, findUser.password))
        throw new Error("Bad credentials!");
      done(null, findUser);
    } catch (error) {
      done(error.message, null);
    }
  })
);
