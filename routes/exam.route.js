const express = require("express");
const examRoute = express();
const examController = require("../controllers/exam.controller");
const jwtMiddleware = require("../middleware/jwt.middleware");

/**
 * @swagger
 * /exams:
 *   get:
 *     summary: Get a list of all exam
 *     tags: [Exam]
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
 * /exams/{id}:
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
 *                       ],
 *                       "correctAnswer": 1
 *                   },
 *                   {
 *                       "content": "Ai là nhà văn nổi tiếng của tác phẩm 'Tôi thấy hoa vàng trên cỏ xanh'?",
 *                       "answers": [
 *                           "Nguyễn Nhật Ánh",
 *                           "Ngô Tất Tố",
 *                           "Nguyễn Du",
 *                           "Trích Thanh"
 *                       ],
 *                       "correctAnswer": 1
 *                   },
 *                   {
 *                       "content": "Quốc gia nào là đất nước có diện tích lớn nhất thế giới?",
 *                       "answers": [
 *                           "Nga",
 *                           "Mỹ",
 *                           "Trung Quốc",
 *                           "Ấn Độ"
 *                       ],
 *                       "correctAnswer": 0
 *                   },
 *                   {
 *                       "content": "Bộ phận nào của cơ thể chịu trách nhiệm giữ thăng bằng?",
 *                       "answers": [
 *                           "Mắt",
 *                           "Tai",
 *                           "Tay",
 *                           "Chân"
 *                       ],
 *                       "correctAnswer": 3
 *                   },
 *                   {
 *                       "content": "Nhân vật nào nổi tiếng trong truyện 'Harry Potter' của J.K. Rowling?",
 *                       "answers": [
 *                           "Frodo Baggins",
 *                           "Hermione Granger",
 *                           "Katniss Everdeen",
 *                           "Luke Skywalker"
 *                       ],
 *                       "correctAnswer": 1
 *                   },
 *                   {
 *                       "content": "Thành phố nào được gọi là 'Thủ đô của thế giới'?",
 *                       "answers": [
 *                           "New York",
 *                           "Paris",
 *                           "London",
 *                           "Tokyo"
 *                       ],
 *                       "correctAnswer": 2
 *                   },
 *                   {
 *                       "content": "Ai là người sáng lập Microsoft?",
 *                       "answers": [
 *                           "Bill Gates",
 *                           "Steve Jobs",
 *                           "Mark Zuckerberg",
 *                           "Elon Musk"
 *                       ],
 *                       "correctAnswer": 0
 *                   },
 *                   {
 *                       "content": "Quốc gia nào nằm ở bán đảo Ấn Độ?",
 *                       "answers": [
 *                           "Thái Lan",
 *                           "Việt Nam",
 *                           "Ấn Độ",
 *                           "Malaysia"
 *                       ],
 *                       "correctAnswer": 2
 *                   },
 *                   {
 *                       "content": "Thung lũng nổi tiếng với ngành công nghiệp công nghệ ở Mỹ là gì?",
 *                       "answers": [
 *                           "Silicon Valley",
 *                           "Green Valley",
 *                           "Tech Valley",
 *                           "Innovation Valley"
 *                       ],
 *                       "correctAnswer": 0
 *                   },
 *                   {
 *                       "content": "Ai là nhà khoa học nổi tiếng với lý thuyết tương đối?",
 *                       "answers": [
 *                           "Isaac Newton",
 *                           "Galileo Galilei",
 *                           "Albert Einstein",
 *                           "Stephen Hawking"
 *                       ],
 *                       "correctAnswer": 2
 *                   }
 *               ]
 *       404:
 *         description: Not found
 *         content:
 *          application/json:
 *            example:
 *             message: "Exam not found"
 */
examRoute.get("/:id", jwtMiddleware.validateToken, examController.getExam);

module.exports = examRoute;
