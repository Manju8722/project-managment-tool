import { SignOptions } from "jsonwebtoken";
import { UserDocument } from "../models/user.model";
import { config } from "../config/app.config";
import jwt from "jsonwebtoken";
export type AccessPayload = {
  userId: UserDocument["_id"];
};

type SignOptionAndSecrete = SignOptions & {
  secrete: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

export const accessTokenSignOptions: SignOptionAndSecrete = {
  // @ts-ignore
  expiresIn: config.JWT_EXPIRES_In,
  secrete: config.JWT_SECRETE,
};

export const signJwtToken = (
  payload: AccessPayload,
  options?: SignOptionAndSecrete
) => {
  const { secrete, ...opts } = options || accessTokenSignOptions;
  console.log("🚀 ~ opts:", opts);

  return jwt.sign(payload, secrete, {
    ...defaults,
    ...opts,
  });
};
