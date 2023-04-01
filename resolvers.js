import { quotes, users } from "./fakedb.js";
import pkg from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_SECRET } from "./config.js";

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

export const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, args) => await User.findOne({ _id: args._id }),
    iquote: async (_, args) => await Quote.find({ by: args.by }),
    quotes: async () => await Quote.find({}),
    myProfile: async (_, args, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in!");
      }
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    quotes: async (user) => await Quote.find({ by: user._id }),
  },
  Quote: {
    user: async (quote) => await User.findOne({ _id: quote.by }),
  },
  Mutation: {
    signupUser: async (_, { newUser }) => {
      const existingUser = await User.findOne({ email: newUser.email });
      if (existingUser) {
        throw new Error("User already exists with that email");
      }
      const hashedPwd = await pkg.hash(newUser.password, 12);
      const newUserObj = new User({
        ...newUser,
        password: hashedPwd,
      });
      return await newUserObj.save();
    },
    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User does not exist with that email");
      }
      const matchPwd = await pkg.compare(userSignin.password, user.password);
      if (!matchPwd) {
        throw new Error("Email or password is invalid");
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return { token: token, userId: user._id };
    },
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in!");
      }
      const newQuote = new Quote({
        name,
        by: userId,
      });
      return await newQuote.save();
    },
  },
};
