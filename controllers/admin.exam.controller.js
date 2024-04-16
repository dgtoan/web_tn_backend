const { connectDb } = require('../config/mongo.config');
const constants = require('../utils/constants');
const ObjectId = require("mongodb").ObjectId;


const adminExamController = {
    createExam: async (req, res) => {
        try {
            let exam = req.body;
            if (!exam.name) {
                return res.status(400).send({ message: 'Exam name is required' });
            } 
            if (!exam.duration) {
                return res.status(400).send({ message: 'Exam duration is required' });
            }
            if (!exam.questions || exam.questions.length === 0) {
                return res.status(400).send({ message: 'Exam should have at least one question' });
            }
            if (!exam.hasOwnProperty('start')) {
                exam.start = null;
            }
            const {db, client} = await connectDb();
            const examCollection = db.collection(constants.EXAMS_COLLECTION_NAME);
            const result = await examCollection.insertOne(exam);
            res.status(201).send({ 
                id: result.insertedId,
                name: exam.name,
                start: exam.start,
                duration: exam.duration
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    updateExam: async (req, res) => {
        try {
            const examId = req.params.id;
            let exam = req.body;
            if (!exam.name) {
                return res.status(400).send({ message: 'Exam name is required' });
            } 
            if (!exam.duration) {
                return res.status(400).send({ message: 'Exam duration is required' });
            }
            if (!exam.questions || exam.questions.length === 0) {
                return res.status(400).send({ message: 'Exam should have at least one question' });
            }

            if (!exam.hasOwnProperty('start')) {
                exam.start = null;
            }

            const {db, client} = await connectDb();
            const examCollection = db.collection(constants.EXAMS_COLLECTION_NAME);
        
            const result = await examCollection.updateOne({ _id: new ObjectId(examId) }, { $set: exam });
            if (result.modifiedCount === 0) {
                if (result.matchedCount === 0) {
                    return res.status(404).send({ message: 'Exam not found' });
                }
                return res.status(204).send();
            }
            res.status(200).send();
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    deleteExam: async (req, res) => {
        try {
            const examId = req.params.id;
            const {db, client} = await connectDb();
            const examCollection = db.collection(constants.EXAMS_COLLECTION_NAME);
            const result = await examCollection.deleteOne({ _id: new ObjectId(examId) });
            if (result.deletedCount === 0) {
                return res.status(404).send({ message: 'Exam not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
};

module.exports = adminExamController;
