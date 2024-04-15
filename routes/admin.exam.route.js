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

module.exports = adminExamRoute;
