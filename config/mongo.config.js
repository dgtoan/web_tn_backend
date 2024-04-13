const MongoClient = require("mongodb").MongoClient;

// TODO: paste a mongo URL here
const URL = "mongodb+srv://alexcao194:oAWLfcIvFHZYfxfK@cluster0.6ra50nr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DB_NAME = "tnptit";

let client;

async function connectDb() {
    if (!client) {
        client = await MongoClient.connect(URL);
    }

    return {
        db: client.db(DB_NAME),
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
