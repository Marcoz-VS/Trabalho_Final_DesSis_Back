import dotenv from "dotenv";
dotenv.config();

import "../config/database.js";
import bcrypt from "bcrypt";
import { User } from "../models/Index.js";

const createAdmin = async () => {
  const exists = await User.findOne({
    where: { email: "admin@system.com" },
  });

  if (exists) {
    console.log("Admin já existe");
    return;
  }

  const hash = await bcrypt.hash("123456", 10);

  await User.create({
    name: "Admin",
    email: "admin@system.com",
    password: hash,
    role: "admin",
  });

  console.log("Admin criado");
};

createAdmin();