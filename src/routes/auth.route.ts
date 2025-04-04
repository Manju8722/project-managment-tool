import { Router } from "express";
import passport from "passport";
import { config } from "../config/app.config";
import {
  googleloginCallback,
  loginUserController,
  logOutController,
  registerUserController,
} from "../controllers/auth.controller";

const authRoutes = Router();
const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

authRoutes.post("/register", registerUserController);

authRoutes.post("/login", loginUserController);

authRoutes.post("/logout", logOutController);

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: failedUrl,
    session: false,
  }),
  googleloginCallback
);

export default authRoutes;
