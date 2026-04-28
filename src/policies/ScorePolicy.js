import { Enrollment, Student, Class, Score } from "../models/Index.js";

const ScorePolicy = {
    byEnrollment: async (user, enrollmentId) => {
        if (user.role === "admin") return true;

        const enrollment = await Enrollment.findByPk(enrollmentId);

        if (!enrollment) return false;

        if (user.role === "student") {
            const student = await Student.findOne({
                where: {
                    user_id: user.id,
                },
            });

            if (!student) return false;

            return student.id === enrollment.student_id;
        }

        if (user.role === "professor") {
            const turma = await Class.findByPk(enrollment.class_id);

            if (!turma) return false;

            return user.id === turma.professor_id;
        }

        return false;
    },
    byScore: async (user, scoreId) => {
        const score = await Score.findByPk(scoreId);

        if (!score) return false;

        return await ScorePolicy.byEnrollment(
            user,
            score.enrollment_id
          );
    }
};

export default ScorePolicy;