import { randomInt } from "crypto";
import User from "../models/User.js";

export async function generateCredentials(name, domain) {
  const normalized = name.toLowerCase().replace(/\s+/g, "");

  let number = randomInt(0, 999);
  let email = `${normalized}${number}@${domain}`;

  let exists = await User.findOne({
    where: { email },
  });

  while (exists) {
    number = randomInt(0, 999);
    email = `${normalized}${number}@${domain}`;

    exists = await User.findOne({
      where: { email },
    });
  }

  const passwordNumber = randomInt(100000, 1000000);
  const temporaryPassword = `${name}${passwordNumber}`;

  return {
    email,
    temporaryPassword,
  };
}