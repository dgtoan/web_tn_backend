const express = require("express");
const adminAuthRouter = express();
const adminAuthController = require("../controllers/admin.auth.controller");
const jwtMiddleware = require("../middleware/jwt.middleware");

adminAuthRouter.post("/login", adminAuthController.login);

adminAuthRouter.get("/refresh_token", adminAuthController.refreshToken);

adminAuthRouter.get("/validate", jwtMiddleware.validateToken, adminAuthController.validate);

module.exports = adminAuthRouter;
