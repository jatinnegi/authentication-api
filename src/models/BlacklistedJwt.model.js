import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

class BlacklistedJWT extends Model {}

BlacklistedJWT.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
);

export default BlacklistedJWT;
