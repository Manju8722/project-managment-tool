import mongoose, { Document, mongo, Schema } from "mongoose";
import { ProviderEnum, ProviderEnumType } from "../enums/account-provider.enum";

interface AccountantDocument extends Document {
  provider: ProviderEnumType;
  providerId: string; // email,facebookid, googleid
  userId: mongoose.Types.ObjectId;
  refreshToken: string | null;
  tokenExpiry: Date | null;
  createdAt: Date;
}

const accountSchema = new Schema<AccountantDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      enum: Object.values(ProviderEnum),
      required: true,
    },
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    tokenExpiry: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.refreshToken;
      },
    },
  }
);

export default mongoose.model<AccountantDocument>("Account", accountSchema);
