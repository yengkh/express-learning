import express from "express";
import router from "./router/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { users } from "../utils/constants.js";
import passport from "passport";
import MongoStore from "connect-mongo";
import "./strategies/local-strategy-with-mongoose.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost/express_one")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((error) => console.log(`Error: ${error}`));

app.use(express.json());
app.use(cookieParser("my-secret"));
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited = true;
  response.cookie("hello", "test cookies", {
    maxAge: 60000 * 60 * 2,
    signed: true,
  });
  response.status(200).send("Welcome to our API!");
});

app.post("/api/user/auth", (request, respone) => {
  const {
    body: { email, password },
  } = request;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user)
    return respone.status(401).send({ message: "Invalid credentials!" });

  request.session.user = user;
  respone
    .status(200)
    .send({ success: true, message: "Login successful!", user: user });
});

app.get("/api/user/auth/status", (request, respone) => {
  request.sessionStore.get(request.sessionID, (err, session) => {
    if (err) {
      console.error(err);
      return respone.status(500).send({ message: "Internal server error" });
    }
    console.log(session);
  });
  return request.session.user
    ? respone.status(200).send(request.session.user)
    : respone.status(401).send({
        message: "Not authenticated",
      });
});

app.post(
  "/api/auth/login",
  passport.authenticate("local"),
  (request, response) => {
    response.sendStatus(200);
  }
);

app.use("/api/user/auth/logout", (request, response) => {
  if (!request.user) return response.sendStatus(401);
  request.logout((error) => {
    if (error) return response.sendStatus(404);
    response.sendStatus(200);
  });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}!`));
