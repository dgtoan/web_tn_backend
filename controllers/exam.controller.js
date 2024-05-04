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
    
    listExamResults: async (req, res) => {
        try {
            const userId = req.user._id;
            const {name, type, submittedAtFrom, submittedAtTo} = req.query;

            const {db, client} = await connectDb();
            const examResultsCollection = db.collection(constants.EXAM_RESULTS_COLLECTION_NAME);
            const examsCollection = db.collection(constants.EXAMS_COLLECTION_NAME);

            let filter = { userId: userId };
            if (submittedAtFrom && submittedAtTo) {
                filter.submittedAt = {
                    $gte: new Date(submittedAtFrom),
                    $lt: new Date(submittedAtTo)
                };
            }
            const results = await examResultsCollection.find(filter).toArray();
            const examIds = results.map(result => result.examId);
            let examQuery = {_id: { $in: examIds } };
            if (name) {
                examQuery.name = { $regex: new RegExp(name, 'i') };
            }
            if (type) {
                if (type === 'Free access') {
                    examQuery.start = null;
                } else if (type === 'Specific time') {
                    examQuery.start = { $ne: null };
                }
            }
            const exams = await examsCollection.find(examQuery).toArray();
            let examResults = results.map(result => {
                let exam = exams.find(exam => exam._id.equals(result.examId));
                delete exam.questions;
                delete result.userId;
                delete result.examId;
                const resultId = result._id;
                delete result._id;
                delete result.details;
                return {
                    id: resultId,
                    exam: exam,
                    result: result
                };
            });
            res.status(200).send({
                examResults: examResults
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = examController;
