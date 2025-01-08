import passport from "passport";
import { Strategy } from "passport-discord";
import { DiscordUser } from "../mongoose/schema/discord-user.js";
passport.serializeUser((user, done) => {
  console.log("Inside serializeUser");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Inside deserializeUser");
  console.log(`Deserializing ID: ${id}`);
  try {
    const findUser = await DiscordUser.findOne(id);
    if (!findUser) throw new Error("User not found!");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});
passport.use(
  new Strategy(
    {
      clientID: "1326556942214365289",
      clientSecret: "Pztnmem9yQkN4G09QkokZry2LJeSu4aZ",
      callbackURL: "http://localhost:3000/api/auth/discord/redirect",
      scope: ["identify", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Profile: ", profile);
      let findUser;
      try {
        findUser = await DiscordUser.findOne({
          discordId: profile.id,
        });
      } catch (error) {
        return done(error, null);
      }

      try {
        if (!findUser) {
          const newUser = new DiscordUser({
            username: profile.username,
            discordId: profile.id,
          });
          const newProfile = newUser.save();
          return done(null, newProfile);
        }

        return done(null, findUser);
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    }
  )
);
