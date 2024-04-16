const { connectDb } = require('../config/mongo.config');
const constants = require('../utils/constants');
const ObjectId = require("mongodb").ObjectId;


const examController = {
    listExams: async (req, res) => {
        try {
            const {db, client} = await connectDb();
            const examCollection = db.collection(constants.EXAMS_COLLECTION_NAME);
    
            const { name, type } = req.query;
    
            let query = {};
            if (name) {
                query.name = { $regex: new RegExp(name, 'i') };
            }
            if (type) {
                if (type === 'Free access') {
                    query.start = null;
                } else if (type === 'Specific time') {
                    query.start = { $ne: null };
                }
            }
    
            const exams = await examCollection.find(query).toArray();
            const mappedExams = exams.map(exam => {
                return {
                    id: exam._id,
                    name: exam.name,
                    start: exam.start,
                    duration: exam.duration
                };
            });
            res.send({
                exams: mappedExams
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getExam: async (req, res) => {
        try {
            const {db, client} = await connectDb();
            const examId = req.params.id;
            const examCollection = db.collection(constants.EXAMS_COLLECTION_NAME);
            const exam = await examCollection.findOne({ _id: new ObjectId(examId) });
            if (!exam) {
                return res.status(404).json({ message: 'Exam not found' });
            }
            exam.questions.forEach(question => {
                delete question.correctAnswer;
            });
            res.send(
                {
                    id: exam._id,
                    name: exam.name,
                    start: exam.start,
                    duration: exam.duration,
                    questions: exam.questions
                }
            );
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    submitExam: async (req, res) => {
        try {
            const { db } = await connectDb();
            const examId = req.params.id;
            const userId = req.user._id;
            console.log(userId);
            const userAnswers = req.body.answers;
    
            const examCollection = db.collection(constants.EXAMS_COLLECTION_NAME);
            const resultsCollection = db.collection(constants.EXAM_RESULTS_COLLECTION_NAME);
    
            const exam = await examCollection.findOne({ _id: new ObjectId(examId) });
            if (!exam) {
                return res.status(404).json({ message: 'Exam not found' });
            }
    
            let correctCount = 0;
            const detailedResults = exam.questions.map((question, index) => {
                const isCorrect = question.correctAnswer === userAnswers[index];
                if (isCorrect) correctCount++;
    
                return {
                    question: question.content,
                    yourAnswer: userAnswers[index],
                    correctAnswer: question.correctAnswer,
                    isCorrect: isCorrect
                };
            });
    
            const result = {
                userId: userId,
                examId: exam._id,
                submittedAt: new Date(),
                correctCount: correctCount,
                totalQuestions: exam.questions.length,
                details: detailedResults
            };
    
            await resultsCollection.insertOne(result);
    
            delete result._id
            res.status(200).send(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
};

module.exports = examController;
