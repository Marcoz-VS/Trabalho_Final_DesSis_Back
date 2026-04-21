import { sequelize } from "../config/database.js";

import User from "./User.js";
import Student from "./Student.js";
import Class from "./Class.js";
import Schedule from "./Schedule.js";
import Enrollment from "./Enrollment.js";
import Score from "./Score.js";

// USER → STUDENT
User.hasOne(Student, {
  foreignKey: "user_id",
  as: "student",
  onDelete: "CASCADE",
});
Student.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// USER → CLASS (professor)
User.hasMany(Class, {
  foreignKey: "professor_id",
  as: "classes",
  onDelete: "SET NULL",
});
Class.belongsTo(User, {
  foreignKey: "professor_id",
  as: "professor",
});

// CLASS → SCHEDULE
Class.hasMany(Schedule, {
  foreignKey: "class_id",
  as: "schedules",
  onDelete: "CASCADE",
});
Schedule.belongsTo(Class, {
  foreignKey: "class_id",
  as: "class",
});

// STUDENT → ENROLLMENT
Student.hasMany(Enrollment, {
  foreignKey: "student_id",
  as: "enrollments",
  onDelete: "CASCADE",
});
Enrollment.belongsTo(Student, {
  foreignKey: "student_id",
  as: "student",
});

// CLASS → ENROLLMENT
Class.hasMany(Enrollment, {
  foreignKey: "class_id",
  as: "enrollments",
  onDelete: "CASCADE",
});
Enrollment.belongsTo(Class, {
  foreignKey: "class_id",
  as: "class",
});

// ENROLLMENT → SCORE
Enrollment.hasMany(Score, {
  foreignKey: "enrollment_id",
  as: "scores",
  onDelete: "CASCADE",
});
Score.belongsTo(Enrollment, {
  foreignKey: "enrollment_id",
  as: "enrollment",
});

export { sequelize, User, Student, Class, Schedule, Enrollment, Score };
