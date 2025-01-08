import { users } from "../../utils/constants.js";
import { validationResult, matchedData } from "express-validator";
export const getAllUsers = (request, respone) => {
  respone.status(200).send({
    status: true,
    data: users,
  });
};

export const getUserByEmail = (request, response) => {
  console.log(request.session.id);
  request.sessionStore.get(request.session.id, (error, sessionData) => {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log(sessionData);
  });

  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(400).send({
      errors: result.array(),
    });
  const { email } = request.query;
  if (email)
    return response.send({
      status: true,
      data: users.filter((user) => user.email == email),
    });
};

export const postNewUser = (request, response) => {
  const result = validationResult(request);
  if (!result.isEmpty()) {
    return response.status(400).json({ errors: result.array() });
  }

  const data = matchedData(request);
  const user = { id: users[users.length - 1].id + 1, ...data };
  users.push(user);
  return response.status(201).send({
    status: true,
    data: users,
  });
};

export const getUserById = (request, response) => {
  const { userIndex } = request;
  const user = users[userIndex];
  response.status(200).send({
    success: true,
    data: user,
  });
};

export const updateUserByPatch = (request, response) => {
  const { body, userIndex } = request;
  const updatedUser = { ...users[userIndex], ...body };
  response.status(200).send({
    success: true,
    data: updatedUser,
  });
};

export const updateUserByPutMethod = (resquest, response) => {
  const { body, userIndex } = resquest;
  users[userIndex] = { id: users[userIndex].id, ...body };
  response.status(200).send({
    status: true,
    data: users[userIndex],
  });
};

export const deleteUser = (request, response) => {
  const { userIndex } = request.params;
  users.splice(userIndex, 1);
  response.status(200).send({
    status: true,
    message: "User deleted successfully!",
  });
};
