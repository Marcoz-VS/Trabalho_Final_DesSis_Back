import { User } from "../models/Index.js";

const UserPolicy = {
  byUser: async (user, userId) => {
    if (user.role === "admin") return true;

    const targetUser = await User.findByPk(userId);

    if (!targetUser) return false;

    return targetUser.id === user.id;
  },
};

export default UserPolicy;
