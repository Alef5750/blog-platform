import mongoose, { Schema, Document, HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile: {
    bio: string;
    socialLinks: string[];
  };
  generateAuthToken: () => Promise<string>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    bio: String,
    socialLinks: [String],
  },
});

// Hash password before saving
UserSchema.pre<HydratedDocument<IUser>>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Export this later
interface JwtPayload {
  _id: string;
  iat?: number;
}

declare const JWT_SECRET: string; // If using env vars
// Generate JWT token
UserSchema.methods.generateAuthToken = async function (): Promise<string> {
  // Explicitly type the payload object
  const payload: JwtPayload = {
    _id: this._id.toString(),
  };

  return jwt.sign(payload, JWT_SECRET);
};


export default mongoose.model<IUser>("User", UserSchema);
