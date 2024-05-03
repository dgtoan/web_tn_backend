const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { router } = require("./routes/index");
const cors = require("cors");
const { connectDb } = require("./config/mongo.config");
const app = express();
const option = require('./config/swagger.config');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const specs = swaggerJsdoc(option());

// Kết nối tới CSDL ngay khi server khởi động
connectDb().then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});

// check server is running
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", router.authRouter);
app.use("/admin/auth", router.adminAuthRouter);
app.use("/admin/exams", router.adminExamRouter);
app.use("/exams", router.examRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


module.exports = app;
