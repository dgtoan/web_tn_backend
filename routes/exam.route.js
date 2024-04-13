const express = require("express");
const examRoute = express();
const examController = require("../controllers/exam.controller");
const jwtMiddleware = require("../middleware/jwt.middleware");

examRoute.get("/", jwtMiddleware.validateToken, examController.listExams);

examRoute.get("/:id", jwtMiddleware.validateToken, examController.getExam);

module.exports = examRoute;
