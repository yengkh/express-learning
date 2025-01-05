import { users } from "./constants.js";
export const resoleUserById = (request, response, next) => {
  const {
    body,
    params: { id },
  } = request;
  const parseId = parseInt(id);
  if (!parseId)
    return response.status(400).json({ message: "Invalid user id!" });
  const userIndex = users.findIndex((user) => user.id === parseId);
  if (userIndex === -1)
    return response.status(404).send({ message: "User not found" });
  request.userIndex = userIndex; // pass value or result from one to another
  next();
};
