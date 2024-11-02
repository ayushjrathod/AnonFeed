import mongoose from "mongoose";

export interface Message extends mongoose.Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: mongoose.Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  verifyCode?: string;
  verifyCodeExpiry?: Date;
  isAcceptingMessage: boolean;
  isVerified: boolean;
  messages: Message[];
}

const UserSchema: mongoose.Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "provide a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

export const MessageModel = mongoose.models.Message || mongoose.model<Message>("Message", MessageSchema);
export const UserModel = mongoose.models.User || mongoose.model<User>("User", UserSchema);
