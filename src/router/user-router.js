import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  createUserValidationsSchema,
  checkUserInputEmailSchema,
} from "../../utils/validatorSchema.js";
import { resoleUserById } from "../../utils/resoleUserById.js";
import {
  getAllUsers,
  getUserByEmail,
  postNewUser,
  getUserById,
  updateUserByPatch,
  updateUserByPutMethod,
  deleteUser,
} from "../controller/user-controller.js";
const router = Router();
// Get all User s
router.get("/list", getAllUsers);

// Get User by email
router.get("/", checkSchema(checkUserInputEmailSchema), getUserByEmail);

// Add new user
router.post("/", checkSchema(createUserValidationsSchema), postNewUser);

// Get user by ID
router.get("/:id", resoleUserById, getUserById);

// Uppdate User using patch method
router.patch("/:id", resoleUserById, updateUserByPatch);

// Update user by ID
router.put("/:id", resoleUserById, updateUserByPutMethod);

// Delete User by ID
router.delete("/:id", deleteUser);

export default router;
