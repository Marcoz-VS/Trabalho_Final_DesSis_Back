import { Student, Class } from "../models/Index.js";

const EnrollmentPolicy = {
    byStudent: async (user, studentId) => {
        if (user.role === "admin") return true;

        if (user.role === "student") {
            const student = await Student.findOne({
                where: {
                    user_id: user.id,
                },
            });

            return student && student.id == studentId;
        }

        return false;
    },
    byClass: async (user, classId) => {
        if (user.role === "admin") return true;

        if (user.role === "professor") {
            const turma = await Class.findByPk(classId);

            return turma && turma.professor_id === user.id;
        }

        return false;
    }
};

export default EnrollmentPolicy;