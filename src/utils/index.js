import jwt from "jsonwebtoken";

export function cleanErrors(errors) {
  const errorsBody = {};

  for (const error of errors) {
    const key = error.path;
    const value = error.msg;

    errorsBody[key] = value;
  }

  return errorsBody;
}

export function getAccessTokenFromHeaders({ authorization }) {
  return {
    token: authorization?.split(" ")[1],
  };
}

export function jwtVerify(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
