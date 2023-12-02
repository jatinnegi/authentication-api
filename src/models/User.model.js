import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import { hash, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, modelName: "users" }
);

User.addHook("beforeCreate", async (user) => {
  if (user.password) {
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
  }
});

User.prototype.checkPassword = function (textPassword) {
  return compareSync(textPassword, this.password);
};

User.prototype.generateAuthToken = function () {
  const payload = {
    userId: this.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  return token;
};

export default User;
