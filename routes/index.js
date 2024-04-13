const authRouter = require("./auth.route");
const adminAuthRouter = require("./admin.auth.route");
const adminExamRouter = require("./admin.exam.route");
const examRouter = require("./exam.route");

const router = {
  authRouter,
  adminAuthRouter,
  adminExamRouter,
  examRouter
};

module.exports = {
  router
};