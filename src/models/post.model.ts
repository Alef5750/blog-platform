import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IPost extends Document {
  title: string;
  content: string;
  author: IUser["_id"];
  comments: Array<{
    content: string;
    author: IUser["_id"];
    createdAt: Date;
  }>;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [
    {
      content: { type: String, required: true },
      author: { type: Schema.Types.ObjectId, ref: "User", required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model<IPost>("Post", PostSchema);
