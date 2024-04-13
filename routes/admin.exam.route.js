const express = require("express");
const adminExamRoute = express();
const adminExamController = require("../controllers/admin.exam.controller");
const jwtMiddleware = require("../middleware/jwt.middleware");

adminExamRoute.post("/", jwtMiddleware.validateToken, adminExamController.createExam);

adminExamRoute.put("/:id", jwtMiddleware.validateToken, adminExamController.updateExam);

adminExamRoute.delete("/:id", jwtMiddleware.validateToken, adminExamController.deleteExam);

module.exports = adminExamRoute;
