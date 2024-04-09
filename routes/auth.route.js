const express = require("express");
const authRouter = express();
const authController = require("../controllers/auth.controller");
const jwtMiddleware = require("../middleware/jwt.middleware");

authRouter.post("/login", authController.login);

authRouter.post("/register", authController.register);

authRouter.get("/refresh_token", authController.refreshToken);

authRouter.get("/validate", jwtMiddleware.validateToken, authController.validate);

module.exports = authRouter;
