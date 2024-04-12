const authRouter = require("./auth.route");
const adminAuthRouter = require("./admin.auth.route");

const router = {
  authRouter,
  adminAuthRouter
};

module.exports = {
  router
};