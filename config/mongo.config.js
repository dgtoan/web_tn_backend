const MongoClient = require("mongodb").MongoClient;
const constants = require('../utils/constants');

let client;

async function connectDb() {
    if (!client) {
        client = await MongoClient.connect(constants.DATABASE_URL);
    }

    return {
        db: client.db(constants.DATABASE_NAME),
        client: client
    };
}

async function close() {
    if (client) {
        client.close();
    }

    client = undefined;
}

module.exports = { connectDb, close };
