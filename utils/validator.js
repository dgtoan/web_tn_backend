const { connectDb } = require('../config/mongo.config');
const validator = require('validator');
const constants = require('../utils/constants');
const moment = require('moment');
const ObjectId = require('mongodb').ObjectId;

const validateUtils =
{
    validateEmail: (email) => {
        if (!email) {
            return false;
        }

        return validator.isEmail(email);
    },

    validatePassword: (password) => {
        if (!password) {
            return false;
        }

        return validator.isStrongPassword(password);
    },

    // Validate full name
    validateFullName: (name) => {
        if (!name) {
            return false;
        }

        name = name.trim();

        if (!name.match(constants.NAME_REGEX)) {
            return false;
        }

        return true;
    },

    validateDateOfBirth: (date) => {
        if (!date) {
            return false;
        }

        // Validate date format
        if (!moment(date, 'DD/MM/YYYY', true).isValid()) {
            return false;
        }

        // Compare birth date with current date
        const birthDate = moment(date, 'DD/MM/YYYY');
        const currentDate = moment();

        if (birthDate > currentDate) {
            return false;
        }

        return true;
    },

    validateUrl: (url) => {
        if (!url) {
            return false;
        }

        return validator.isURL(url, {
            // Allow URLs without top-level domain (e.g. localhost)
            require_tld: false
        });
    },

    isAdmin: async (req, res, next) => {
        const userId = req.user._id;

        const { db, client } = await connectDb();
        const usersCollection = db.collection(constants.ADMIN_COLLECTION_NAME);

        try {
            const user = await usersCollection.findOne(
                { _id: new ObjectId(userId) }
            );
        } catch (err) {
            return res.status(403).send(
                {
                    message: "Access is forbidden. This is only for admin"
                }
            );
        }

        if (!user) {
            return res.status(403).send(
                {
                    message: "Access is forbidden. This is only for admin"
                }
            );
        }
        next();
    },

    isEmailExists: async (email) => {

        const { db, client } = await connectDb();
        const usersCollection = db.collection(constants.USERS_COLLECTION_NAME);

        const user = await usersCollection.findOne(
            { email: email }
        );

        if (user) {
            return true;
        }

        return false
    }
}

module.exports = validateUtils;
