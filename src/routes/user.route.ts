import { Router } from "express";
import { getCurrentUserContoller } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUserContoller);
export default userRoutes;
