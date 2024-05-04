const express = require("express");
const examRoute = express();
const examController = require("../controllers/exam.controller");
const jwtMiddleware = require("../middleware/jwt.middleware");

/**
 * @swagger
 * /exams:
 *   get:
 *     summary: Get a list of all exams, with optional filtering by name or type
 *     tags: [Exam]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Exam name to filter by
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [Free access, Specific time]
 *         required: false
 *         description: Type of exam to filter by
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *                 exams: [
 *                     {
 *                         "id": "6619ef8ffc3384ad4a3ab95f",
 *                         "name": "Midterm Exam",
 *                         "start": 1710241800000,
 *                         "duration": 60
 *                     },
 *                     {
 *                         "id": "6619f0af9b0f125403e0fe3b",
 *                         "name": "Midterm Exam",
 *                         "start": 1710241800000,
 *                         "duration": 60
 *                     },
 *                     {
 *                         "id": "6619f1c278e1d64ead9f6b99",
 *                         "name": "Midterm Exam",
 *                         "start": 1710241800000,
 *                         "duration": 60
 *                     }
 *                 ]
 *       401:
 *         description: Unauthorized
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              "message": "Token is invalid"
 */
examRoute.get("/", jwtMiddleware.validateToken, examController.listExams);

/**
 * @swagger
 * /exams/detail/{id}:
 *   get:
 *     summary: Get an exam by ID
 *     tags: [Exam]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the exam
 *         schema:
 *           type: string
 *         example:
 *             6619ef8ffc3384ad4a3ab95f
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "6619ef8ffc3384ad4a3ab95f"
 *               name: "Midterm Exam"
 *               start: 1710241800000
 *               duration: 60
 *               questions: [
 *                   {
 *                       "content": "Thủ đô nước Pháp là thành phố nào?",
 *                       "answers": [
 *                           "Berlin",
 *                           "Paris",
 *                           "Rome",
 *                           "Madrid"
 *                       ]
 *                   },
 *                   {
 *                       "content": "Ai là nhà văn nổi tiếng của tác phẩm 'Tôi thấy hoa vàng trên cỏ xanh'?",
 *                       "answers": [
 *                           "Nguyễn Nhật Ánh",
 *                           "Ngô Tất Tố",
 *                           "Nguyễn Du",
 *                           "Trích Thanh"
 *                       ]
 *                   },
 *                   {
 *                       "content": "Quốc gia nào là đất nước có diện tích lớn nhất thế giới?",
 *                       "answers": [
 *                           "Nga",
 *                           "Mỹ",
 *                           "Trung Quốc",
 *                           "Ấn Độ"
 *                       ]
 *                   },
 *                   {
 *                       "content": "Bộ phận nào của cơ thể chịu trách nhiệm giữ thăng bằng?",
 *                       "answers": [
 *                           "Mắt",
 *                           "Tai",
 *                           "Tay",
 *                           "Chân"
 *                       ]
 *                   },
 *                   {
 *                       "content": "Nhân vật nào nổi tiếng trong truyện 'Harry Potter' của J.K. Rowling?",
 *                       "answers": [
 *                           "Frodo Baggins",
 *                           "Hermione Granger",
 *                           "Katniss Everdeen",
 *                           "Luke Skywalker"
 *                       ]
 *                   },
 *                   {
 *                       "content": "Thành phố nào được gọi là 'Thủ đô của thế giới'?",
 *                       "answers": [
 *                           "New York",
 *                           "Paris",
 *                           "London",
 *                           "Tokyo"
 *                       ]
 *                   },
 *                   {
 *                       "content": "Ai là người sáng lập Microsoft?",
 *                       "answers": [
 *                           "Bill Gates",
 *                           "Steve Jobs",
 *                           "Mark Zuckerberg",
 *                           "Elon Musk"
 *                       ]
 *                   },
 *                   {
 *                       "content": "Quốc gia nào nằm ở bán đảo Ấn Độ?",
 *                       "answers": [
 *                           "Thái Lan",
 *                           "Việt Nam",
 *                           "Ấn Độ",
 *                           "Malaysia"
 *                       ]
 *                   },
 *                   {
 *                       "content": "Thung lũng nổi tiếng với ngành công nghiệp công nghệ ở Mỹ là gì?",
 *                       "answers": [
 *                           "Silicon Valley",
 *                           "Green Valley",
 *                           "Tech Valley",
 *                           "Innovation Valley"
 *                       ]
 *                   },
 *                   {
 *                       "content": "Ai là nhà khoa học nổi tiếng với lý thuyết tương đối?",
 *                       "answers": [
 *                           "Isaac Newton",
 *                           "Galileo Galilei",
 *                           "Albert Einstein",
 *                           "Stephen Hawking"
 *                       ]
 *                   }
 *               ]
 *       404:
 *         description: Not found
 *         content:
 *          application/json:
 *            example:
 *             message: "Exam not found"
 */
examRoute.get("/detail/:id", jwtMiddleware.validateToken, examController.getExam);

/**
 * @swagger
 * /exams/{id}/submit:
 *   post:
 *     summary: Submit answers for an exam and receive detailed results
 *     tags: [Exam]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the exam to submit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of indices representing the user's answers
  *     responses:
 *       200:
 *         description: Returns detailed results of the exam submission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   userId:
 *                     type: string
 *                     description: "The ID of the user who submitted the exam"
 *                   examId:
 *                     type: string
 *                     description: "The ID of the exam"
 *                   submittedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The timestamp when the exam was submitted"
 *                   correctCount:
 *                     type: integer
 *                     description: "The count of correctly answered questions"
 *                   totalQuestions:
 *                     type: integer
 *                     description: "The total number of questions in the exam"
 *                   details:
 *                     type: array
 *                     description: "Detailed results for each question"
 *                     items:
 *                       type: object
 *                       properties:
 *                         question:
 *                           type: string
 *                           description: "The content of the question"
 *                         yourAnswer:
 *                           type: integer
 *                           description: "The answer submitted by the user"
 *                         correctAnswer:
 *                           type: integer
 *                           description: "The correct answer to the question"
 *                         isCorrect:
 *                           type: boolean
 *                           description: "Indicates whether the submitted answer was correct"
 *       404:
 *         description: Not found
 *         content:
 *          application/json:
 *            example:
 *             message: "Exam not found"
 */
examRoute.post("/:id/submit", jwtMiddleware.validateToken, examController.submitExam);


/**
 * @swagger
 * /exams/results:
 *   get:
 *     summary: List exam results by user ID
 *     tags: [Exam]
 *     parameters:
 *       - name: name
 *         in: query
 *         required: false
 *         description: Filter by exam name (case insensitive, partial matches allowed)
 *         schema:
 *           type: string
 *       - name: type
 *         in: query
 *         required: false
 *         description: Filter by exam access type (e.g., 'Free access', 'Specific time')
 *         schema:
 *           type: string
 *           enum:
 *             - Free access
 *             - Specific time
 *       - name: submittedAtFrom
 *         in: query
 *         required: false
 *         description: Lower boundary for submission date filter (inclusive)
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: submittedAtTo
 *         in: query
 *         required: false
 *         description: Upper boundary for submission date filter (exclusive)
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: A list of exam results for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the exam result
 *                   exam:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       start:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       duration:
 *                         type: integer
 *                         description: Duration of the exam in minutes
 *                   result:
 *                     type: object
 *                     properties:
 *                       submittedAt:
 *                         type: string
 *                         format: date-time
 *                       correctCount:
 *                         type: integer
 *                       totalQuestions:
 *                         type: integer
 *                       details:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             question:
 *                               type: string
 *                             yourAnswer:
 *                               type: integer
 *                             correctAnswer:
 *                               type: integer
 *                             isCorrect:
 *                               type: boolean
 *             examples:
 *               application/json:
 *                 - id: "661d4c265acfe5d69cc23860"
 *                   exam:
 *                     name: "Practice for Midterm Exam"
 *                     start: null
 *                     duration: 60
 *                   result:
 *                     submittedAt: "2024-04-15T15:47:50.353Z"
 *                     correctCount: 10
 *                     totalQuestions: 10
 *       403:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: "Access is forbidden."
 */
examRoute.get("/results", jwtMiddleware.validateToken, examController.listExamResults);

/**
 * @swagger
 * /exams/result/{id}:
 *   get:
 *     summary: Get an exam result by ID
 *     tags: [Exam]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the exam result
 *         schema:
 *           type: string
 *         example:
 *             6634feb85518bb50f849670e
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: string
 *                 exam: 
 *                   type: object
 *                   properties: 
 *                     _id: 
 *                       type: string
 *                     name: 
 *                       type: string
 *                     start: 
 *                       type: integer
 *                       format: int64
 *                     duration: 
 *                       type: integer
 *                       format: int32
 *                 result: 
 *                   type: object
 *                   properties: 
 *                     submittedAt: 
 *                       type: string
 *                       format: date-time
 *                     correctCount: 
 *                       type: integer
 *                       format: int32
 *                     totalQuestions: 
 *                       type: integer
 *                       format: int32
 *                     details: 
 *                       type: array
 *                       items: 
 *                         type: object
 *                         properties: 
 *                           question: 
 *                             type: string
 *                           yourAnswer: 
 *                             type: integer
 *                             format: int32
 *                           correctAnswer: 
 *                             type: integer
 *                             format: int32
 *                           isCorrect: 
 *                             type: boolean
 *       404:
 *         description: Not found
 *         content:
 *          application/json:
 *            example:
 *             message:
 *               type: string
 */
examRoute.get("/result/:id", jwtMiddleware.validateToken, examController.getExamResult);

module.exports = examRoute;
