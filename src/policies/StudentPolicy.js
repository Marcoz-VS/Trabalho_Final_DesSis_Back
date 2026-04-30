import { Student } from "../models/Index.js";

const StudentPolicy = {
  byStudent: async (user, studentId) => {
    if (user.role === "admin") return true;

    const student = await Student.findByPk(studentId);

    if (!student) return false;

    if (user.role === "student") {
      return student.user_id === user.id;
    }

    return false;
  },
};

export default StudentPolicy;
