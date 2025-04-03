import { Router } from "express";
import {
  changeWorkspaceMemberRoleController,
  createNewWorkspaceController,
  deleteWorkspaceByIdController,
  getAllWorkspacesUserIsMemberController,
  getWorkspaceAnalyticsController,
  getWorkspaceByIdController,
  getWorkspaceMembersController,
  updateWorkspaceByIdController,
} from "../controllers/workspace.controller";

const workSpaceRoutes = Router();

workSpaceRoutes.post("/create/new", createNewWorkspaceController);

workSpaceRoutes.put("/update/:id", updateWorkspaceByIdController);

workSpaceRoutes.put(
  "/change/member/role/:id",
  changeWorkspaceMemberRoleController
);

workSpaceRoutes.delete("/delete/:id", deleteWorkspaceByIdController);

workSpaceRoutes.get("/all", getAllWorkspacesUserIsMemberController);

workSpaceRoutes.get("/members/:id", getWorkspaceMembersController);

workSpaceRoutes.get("/analytics/:id", getWorkspaceAnalyticsController);

workSpaceRoutes.get("/:id", getWorkspaceByIdController);

export default workSpaceRoutes;
