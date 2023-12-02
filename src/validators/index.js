import { check } from "express-validator";
import User from "../models/User.model.js";

export const userRegisterValidator = [
  check("name", "Name is required").notEmpty(),
  check("username", "Username is required").notEmpty(),
  check("username").custom(async (value) => {
    const existingUser = await User.findOne({
      where: {
        username: value,
      },
    });
    if (existingUser) throw new Error("Username is taken");
  }),
  check("age", "Enter a valid age").isNumeric(),
  check("bio", "Bio is required").notEmpty(),
  check("password", "Password must be between 6-30 characters long").isLength({
    min: 6,
    max: 30,
  }),
];

export const userLoginValidator = [
  check("username", "Username is required").notEmpty(),
  check("password", "Password is required").notEmpty(),
];

export const userUpdateValidator = [
  check("name", "Name is required").notEmpty().optional(),
  check("username", "Username is required").notEmpty().optional(),
  check("username")
    .custom(async (value) => {
      const existingUser = await User.findOne({
        where: {
          username: value,
        },
      });
      if (existingUser) throw new Error("Username is taken");
    })
    .optional(),
  check("age", "Enter a valid age").isNumeric().optional(),
  check("bio", "Bio is required").notEmpty().optional(),
];

export const userPasswordResetValidator = [
  check("oldPassword", "Old password is required").notEmpty(),
  check(
    "newPassword",
    "New password must be between 6-30 characters long"
  ).isLength({
    min: 6,
    max: 30,
  }),
];

export const userAccountDeletionValidator = [
  check("password", "Password is required").notEmpty(),
];
