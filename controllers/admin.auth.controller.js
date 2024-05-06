const jwtService = require("../jwt/jwt.service");
const { connectDb } = require('../config/mongo.config');
const validateUtils = require('../utils/validator');
const constants = require('../utils/constants');
const ObjectId = require("mongodb").ObjectId;

const adminAuthController = {
    login: async (req, res) => {
        const loginData = req.body;

        let user;

        try {
            user = await validateLoginData(loginData);
        } catch (err) {
            return res.status(400).send(
                {
                    message: err.message
                }
            );
        }

        // Get access token and refresh token
        const payload = { _id: user._id };

        const access_token = jwtService.getAccessToken(payload);
        const refresh_token = await jwtService.getRefreshToken(payload);

        res.send({ access_token, refresh_token });
    },

    refreshToken: async (req, res) => {
        const refreshToken = req.headers["refresh_token"];
        if (!refreshToken) {
            return res.status(403).send(
                {
                    message: "Access is forbidden"
                }
            );
        }

        try {
            const access_token = await jwtService.refreshToken(refreshToken, isAdmin=true, res);
            res.send(access_token);
        } catch (err) {
            const message = (err && err.message) || err;
            res.status(403).send(
                {
                    message: message
                }
            );
        }
    },

    validate: async (req, res) => {
        const { db, client } = await connectDb();
        const usersCollection = db.collection(constants.ADMIN_COLLECTION_NAME);

        const user = await usersCollection.findOne(
            { _id: new ObjectId(req.user._id) }
        );

        if (!user) {
            return res.status(403).send(
                {
                    message: "Access is forbidden"
                }
            );
        }

        delete user.password;
        res.send(req.user);
    }
};

const validateLoginData = async (data) => {
    // Pre-validate data
    if (!data) {
        throw new Error("Please enter valid data!");
    }

    const validators = {
        email: validateUtils.validateEmail,
        password: validateUtils.validatePassword
    };

    for (let key in data) {
        if (validators[key]) {
            if (!data[key] || !validators[key](data[key])) {
                throw new Error(`Please enter valid ${key}!`);
            }
        }
    }

    const { db, client } = await connectDb();
    const usersCollection = db.collection(constants.ADMIN_COLLECTION_NAME);

    const user = await usersCollection.findOne(
        { email: data.email }
    );

    if (!user) {
        throw new Error("Email or password is wrong!");
    }

    if (user && user.password !== data.password) {
        throw new Error("Email or password is wrong!");
    }

    return user;
}

module.exports = adminAuthController;
