import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  profile: {
    bio: string;
    socialLinks: string[];
  };
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  profile: {
    bio: String,
    socialLinks: [String],
  },
});

export default mongoose.model<IUser>("User", UserSchema);
