import { config as dotenvConfig } from "dotenv";
dotenvConfig();
import express, { Request, Response, NextFunction } from "express";

import cors from "cors";
// import session from "cookie-session";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import "./config/passport.config";
import passport from "passport";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import isAuthenticated from "./middlewares/isAuthenticated.middleware";
import workSpaceRoutes from "./routes/workspace.route";
import memberRoutes from "./routes/member.route";
import projectRoutes from "./routes/project.route";
import taskRoutes from "./routes/task.route";
import { passportAutheticateJwt } from "./config/passport.config";
// app config
const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     name: "session",
//     keys: [config.SESSION_SECRET],
//     maxAge: 24 * 60 * 60 * 1000,
//     secure: config.NODE_ENV === "production",
//     httpOnly: true,
//     sameSite: "lax",
//   })
// );

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);
// passport config

app.use(passport.initialize());
// app.use(passport.session());

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    return res.status(HTTPSTATUS.OK).json({
      message: "Hello, Subscribe to the channel & share",
    });
  })
);
app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/auth`, passportAutheticateJwt, userRoutes);
app.use(`${BASE_PATH}/workspace`, passportAutheticateJwt, workSpaceRoutes);

app.use(`${BASE_PATH}/member`, passportAutheticateJwt, memberRoutes);

app.use(`${BASE_PATH}/project`, passportAutheticateJwt, projectRoutes);

app.use(`${BASE_PATH}/task`, passportAutheticateJwt, taskRoutes);

app.use(errorHandler);

connectDatabase(() =>
  app.listen(config.PORT, () => {
    console.log(
      "Backend server listening on port : " +
        config.PORT +
        " in " +
        config.NODE_ENV
    );
  })
);
