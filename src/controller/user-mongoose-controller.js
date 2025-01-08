import { matchedData, validationResult } from "express-validator";
import { User } from "../mongoose/schema/user.js";
import { hassPassword } from "../../utils/helper.js";

// Login user
export const LoginUser = async (request, respone) => {
  const result = validationResult(request);
  if (!result.isEmpty()) return respone.status(400).send(result.array());
  const data = matchedData(request);
  console.log(data);
  data.password = hassPassword(data.password);
  console.log(data);

  const newUser = new User(data);
  try {
    const saveUser = await newUser.save();
    return respone.status(201).send({
      success: true,
      message: "User created successfully!",
      data: saveUser,
    });
  } catch (error) {
    return respone.status(400).send({ message: error.message });
  }
};

// Authenticate user
export const authUser = (request, respone) => {
  request.session.user = request.user;
  return respone.status(200).send({
    success: true,
    message: "Authentication successfulluy!",
    user: request.user,
  });
};

export const authStatus = (request, respone) => {
  request.sessionStore.get(request.sessionID, (error, sessionData) => {
    if (error) {
      return respone.status(500).send({ message: "Internal server error" });
    }
    console.log(sessionData);
  });
  console.log(request.user);
  console.log(request.sessionID);

  return request.session.user
    ? respone.status(200).send(request.session.user)
    : respone.status(401).send({ message: "Authentication failed" });
};
