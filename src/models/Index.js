import { sequelize } from '../config/database.js';

import User from './User.js';
import Student from './Student.js';
import Class from './Class.js';
import Schedule from './Schedule.js';
import Enrollment from './Enrollment.js';
import Score from './Score.js';

User.hasOne(Student, { foreignKey: 'user_id', as: 'student' });
Student.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Class, { foreignKey: 'professor_id', as: 'classes' });
Class.belongsTo(User, { foreignKey: 'professor_id', as: 'professor' });

Class.hasMany(Schedule, { foreignKey: 'class_id', as: 'schedules' });
Schedule.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });

Student.hasMany(Enrollment, { foreignKey: 'student_id', as: 'enrollments' });
Enrollment.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });

Class.hasMany(Enrollment, { foreignKey: 'class_id', as: 'enrollments' });
Enrollment.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });

Enrollment.hasMany(Score, { foreignKey: 'enrollment_id', as: 'scores' });
Score.belongsTo(Enrollment, { foreignKey: 'enrollment_id', as: 'enrollment' });

export { sequelize, User, Student, Class, Schedule, Enrollment, Score };