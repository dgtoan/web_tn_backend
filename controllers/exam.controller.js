const { connectDb } = require('../config/mongo.config');
const constants = require('../utils/constants');
const ObjectId = require("mongodb").ObjectId;


const examController = {
    listExams: async (req, res) => {
        try {
            const {db, client} = await connectDb();
            const examCollection = db.collection(constants.EXAMS_COLLECTION_NAME);
            const exams = await examCollection.find({}).toArray();
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
};

module.exports = examController;
