import { z } from "zod";

export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: "Name is required" })
  .max(255);

export const descriptionSchema = z.string().trim().optional();

export const changeRoleSchema = z.object({
  roleId: z.string().trim().length(24),
  memberId: z.string().trim().length(24),
});
export const createWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});

export const updateWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});

export const workspaceIdSchema = z.string().trim().length(24);
