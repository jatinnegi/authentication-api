import User from "../models/User.model.js";
import BlacklistedJWT from "../models/BlacklistedJwt.model.js";
import { getAccessTokenFromHeaders } from "../utils/index.js";
import { hash } from "bcrypt";

const userController = {
  async detail(req, res) {
    try {
      const { user } = req.context;

      delete user.password;
      delete user.isActive;
      delete user.deletedAt;

      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async register(req, res) {
    try {
      const user = await User.create(req.body);
      const userToSend = user.dataValues;

      delete userToSend.password;
      delete userToSend.isActive;
      delete userToSend.createdAt;
      delete userToSend.updatedAt;
      delete userToSend.deletedAt;

      return res.status(200).json({ status: "success", user });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({
        attributes: {
          exclude: ["isActive", "deletedAt", "createdAt", "updatedAt"],
        },
        where: {
          username,
          isActive: true,
        },
      });

      if (!user) return res.status(404).json({ status: "failed" });

      const passwordsMatch = user.checkPassword(password);
      if (!passwordsMatch) return res.status(404).json({ status: "failed" });

      const userToSend = Object.assign({}, user.dataValues);
      delete userToSend.password;

      const token = user.generateAuthToken();
      return res.status(200).json({ token, user: userToSend });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async update(req, res) {
    try {
      const {
        user: { id: userId },
      } = req.context;

      const user = await User.findByPk(userId, {
        attributes: {
          exclude: [
            "password",
            "createdAt",
            "updatedAt",
            "isActive",
            "deletedAt",
          ],
        },
      });

      if (!user) return res.status(400).json({ status: "failed" });

      user.name = req.body.name || user.name;
      user.username = req.body.username || user.username;
      user.age = req.body.age || user.age;
      user.bio = req.body.bio || user.bio;

      await user.save();

      return res.status(200).json({
        status: "success",
        user,
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async passwordReset(req, res) {
    try {
      const {
        user: { id: userId },
      } = req.context;
      const { oldPassword, newPassword } = req.body;

      const user = await User.findByPk(userId);
      const passwordsMatch = user.checkPassword(oldPassword);

      if (!passwordsMatch) return res.status(404).json({ status: "failed" });

      const hashedPassword = await hash(newPassword, 10);
      user.password = hashedPassword;

      await user.save();

      return res.status(200).json({ status: "success" });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async delete(req, res) {
    try {
      const {
        user: { id: userId },
      } = req.context;
      const { password } = req.body;

      const user = await User.findByPk(userId);
      const { token } = getAccessTokenFromHeaders(req.headers);

      if (!user || !user.isActive || !token)
        return res.status(404).json({ status: "failed" });

      const passwordsMatch = user.checkPassword(password);
      if (!passwordsMatch) return res.status(404).json({ status: "failed" });

      // set user.isActive to false
      // later we can run a cron job to permanently remove the user row if it has not been recovered yet
      user.isActive = false;
      user.deletedAt = new Date();

      await user.save();
      await BlacklistedJWT.create({ token });

      return res.status(200).json({ status: "success" });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async logout(req, res) {
    try {
      const {
        user: { id: userId },
      } = req.context;

      const user = await User.findByPk(userId);
      const { token } = getAccessTokenFromHeaders(req.headers);

      if (!user) return res.status(400).json({ status: "failed" });

      await BlacklistedJWT.create({ token });

      return res.status(200).json({ status: "success" });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async recover(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: {
          username,
          isActive: false,
        },
      });

      if (!user) return res.status(404).json({ status: "failed" });

      const passwordsMatch = user.checkPassword(password);
      if (!passwordsMatch) return res.status(404).json({ status: "failed" });

      user.isActive = true;
      await user.save();

      return res.status(200).json({ status: "success" });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
};

export default userController;
