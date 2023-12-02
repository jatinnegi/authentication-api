import { validationResult } from "express-validator";
import {
  cleanErrors,
  getAccessTokenFromHeaders,
  jwtVerify,
} from "../utils/index.js";
import User from "../models/User.model.js";
import BlacklistedJWT from "../models/BlacklistedJwt.model.js";

export function validationMiddleware(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsArray = errors.errors;
    return res
      .status(400)
      .json({ status: "failed", errors: cleanErrors(errorsArray) });
  }

  next();
}

export async function authMiddleware(req, res, next) {
  try {
    Object.assign(req, { context: {} });

    const { token } = getAccessTokenFromHeaders(req.headers);
    if (!token) return next();

    const blacklistedToken = await BlacklistedJWT.findOne({ where: { token } });
    if (blacklistedToken) return next();

    const { userId: id } = jwtVerify(token);

    const user = await User.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!user || !user.isActive) return next();

    Object.assign(req, { context: { user: user.dataValues } });
    next();
  } catch (error) {
    console.error(error);
    next();
  }
}
