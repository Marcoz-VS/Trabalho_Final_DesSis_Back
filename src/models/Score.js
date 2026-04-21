import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Score = sequelize.define("Score", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  enrollment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "enrollments",
      key: "id",
    },
  },
  assessment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
    validate: {
      min: 0,
      max: 10,
    },
  },
  graded_at: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default Score;
