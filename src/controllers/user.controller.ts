import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: IUser = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    // Depends how the username is sent over
    const user = await User.findOne({ username: req.params.username });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// נא לחקור איך לבצע מחיקה ועריכה
