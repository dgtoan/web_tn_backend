const express = require("express");
const adminExamRoute = express();
const adminExamController = require("../controllers/admin.exam.controller");
const validateUtils = require('../utils/validator');
const jwtMiddleware = require("../middleware/jwt.middleware");

/**
 * @swagger
 * /admin/exams:
 *   post:
 *     summary: Create an exam by admin
 *     tags: [Admin Exam]
 *     requestBody:
 *       description: Create exam request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start:
 *                 type: int
 *               duration:
 *                 type: int
 *               questions:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                         content:
 *                            type: string
 *                         answers:
 *                           type: array
 *                           items:
 *                             type: string
 *                         correctAnswer:
 *                           type: int
 *             example:
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
 *     responses:
 *       200:
 *         description: Successful register
 *         content:
 *           application/json:
 *             example:
 *                id: "6619ef8ffc3384ad4a3ab95f"
 *                name: "Midterm Exam"
 *                start: 1710241800000
 *                duration: 60
 *                     
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             message: "Exam name is required"
 */
adminExamRoute.post("/", jwtMiddleware.validateToken, validateUtils.isAdmin, adminExamController.createExam);

/**
 * @swagger
 * /admin/exams/{id}:
 *   put:
 *     summary: Update an exam by ID
 *     tags: [Admin Exam]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the exam
 *         schema:
 *           type: string
 *         example:
 *             6619ef8ffc3384ad4a3ab95f
 *     requestBody:
 *       description: Update exam request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start:
 *                 type: int
 *               duration:
 *                 type: int
 *               questions:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                         content:
 *                            type: string
 *                         answers:
 *                           type: array
 *                           items:
 *                             type: string
 *                         correctAnswer:
 *                           type: int
 *             example:
 *               name: "Midterm Exam updated"
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
 *     responses:
 *       200:
 *         description: Successful update exam      
 *       404:
 *         description: Not found
 *         content:
 *          application/json:
 *            example:
 *             message: "Exam not found"
 */
adminExamRoute.put("/:id", jwtMiddleware.validateToken, validateUtils.isAdmin, adminExamController.updateExam);

/**
 * @swagger
 * /admin/exams/{id}:
 *   delete:
 *     summary: Delete an exam by ID
 *     tags: [Admin Exam]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the exam
 *         schema:
 *           type: string
 *         example:
 *             6619f2fb11fff87155f10a1a
 *     responses:
 *       204:
 *          description: Exam deleted
 *       404:
 *         description: Exam not found
 *         content:
 *          application/json:
 *            example:
 *              message: "Exam not found"
 */
adminExamRoute.delete("/:id", jwtMiddleware.validateToken, validateUtils.isAdmin, adminExamController.deleteExam);

/**
 * @swagger
 * /admin/exams/results:
 *   get:
 *     summary: List exam results by user ID or Exam ID
 *     tags: [Admin Exam]
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: false
 *         description: The user ID to find exam results for
 *         schema:
 *           type: string
 *         example: f44f7b65-3bc2-410e-a3bd-80d6c1de8c36
 *       - name: examId
 *         in: query
 *         required: false
 *         description: The exam ID to find exam results for
 *         schema:
 *           type: string
 *         example: 6619ef8ffc3384ad4a3ab95f
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
 *               message: "Access is forbidden. This is only for admin"
 */
adminExamRoute.get("/results/", jwtMiddleware.validateToken, validateUtils.isAdmin, adminExamController.listExamResults);

module.exports = adminExamRoute;
