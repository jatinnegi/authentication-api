import { Router } from "express";
import {
  userLoginValidator,
  userRegisterValidator,
  userUpdateValidator,
  userPasswordResetValidator,
  userAccountDeletionValidator,
} from "../validators/index.js";
import { validationMiddleware } from "../middlewares/index.js";
import { authGuards } from "../guards/index.js";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post(
  "/register",
  authGuards.isGuest,
  userRegisterValidator,
  validationMiddleware,
  userController.register
);

router.post(
  "/login",
  authGuards.isGuest,
  userLoginValidator,
  validationMiddleware,
  userController.login
);

router.get("/detail", authGuards.isAuth, userController.detail);

router.put(
  "/update",
  authGuards.isAuth,
  userUpdateValidator,
  validationMiddleware,
  userController.update
);

router.post(
  "/password-reset",
  authGuards.isAuth,
  userPasswordResetValidator,
  validationMiddleware,
  userController.passwordReset
);

router.delete(
  "/delete",
  authGuards.isAuth,
  userAccountDeletionValidator,
  validationMiddleware,
  userController.delete
);

router.post("/logout", authGuards.isAuth, userController.logout);

router.post(
  "/recover",
  authGuards.isGuest,
  userLoginValidator,
  validationMiddleware,
  userController.recover
);

export default router;
