export const authGuards = {
  isGuest(req, res, next) {
    const {
      context: { user },
    } = req;

    if (!user) return next();

    return res.status(403).json({
      status: "failed",
      message: "forbidden",
    });
  },
  isAuth(req, res, next) {
    const {
      context: { user },
    } = req;

    if (user) return next();

    return res.status(403).json({ status: "failed", message: "forbidden" });
  },
};
