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
    },

    listExamResults: async (req, res) => {
        try { 
            const userId = req.query.userId;
            const examId = req.query.examId;
            if (userId) await listExamResultsByUserId(req, res);
            else if (examId) await listExamResultsByExamId(req, res);
            else res.status(400).send({ message: 'User ID or Exam ID is required' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
};

module.exports = adminExamController;

async function listExamResultsByUserId(req, res) {
    try {
        const userId = req.query.userId;
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
        res.status(500).send({ message: error.message });
    }
}

async function listExamResultsByExamId(req, res) {
    try {
        const examId = req.query.examId;
        console.log(examId);
        const {submittedAtFrom, submittedAtTo} = req.query;

        const {db, client} = await connectDb();
        const examResultsCollection = db.collection(constants.EXAM_RESULTS_COLLECTION_NAME);
        const examsCollection = db.collection(constants.EXAMS_COLLECTION_NAME);
        const usersCollection = db.collection(constants.USERS_COLLECTION_NAME);

        let filter = { examId: new ObjectId(examId) };
        if (submittedAtFrom && submittedAtTo) {
            filter.submittedAt = {
                $gte: new Date(submittedAtFrom),
                $lt: new Date(submittedAtTo)
            };
        }
        const results = await examResultsCollection.find(filter).toArray();
        const userIds = results.map(result => result.userId);
        const users = await usersCollection.find({ _id: { $in: userIds } }).toArray();
        const exam = await examsCollection.findOne({ _id: new ObjectId(examId) });
        let examResults = results.map(result => {
            let user = users.find(user => user._id === result.userId);
            const resultId = result._id;
            delete result._id;
            delete result.details;
            return {
                id: resultId,
                fullName: user.fullName,
                result: result
            };
        });
        res.status(200).send({
            examResults: examResults
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
