import mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();
import connectDatabase from "../config/database.config";
import RoleModel from "../models/roles-permission.model";
import { RolePermissions } from "../utils/roles-permission";

const seedRoles = async () => {
  try {
    await connectDatabase();
    const session = await mongoose.startSession();
    session.startTransaction();

    console.log("clearing existing rolemodal data");
    await RoleModel.deleteMany({}, { session });
    console.log("done with existing data clear");

    for (const roleName in RolePermissions) {
      const role = roleName as keyof typeof RolePermissions;
      const permissions = RolePermissions[role];

      // Check if the role already exists
      const existingRole = await RoleModel.findOne({ name: role }).session(
        session
      );
      if (!existingRole) {
        const newRole = new RoleModel({
          name: role,
          permissions: permissions,
        });
        await newRole.save({ session });
        console.log(`Role ${role} added with permissions.`);
      } else {
        console.log(`Role ${role} already exists.`);
      }
    }
    await session.commitTransaction();
    console.log("Transaction committed.");

    session.endSession();
    console.log("Session ended.");

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.log("🚀 ~ seeder ~ error:", error);
  }
};

seedRoles();
