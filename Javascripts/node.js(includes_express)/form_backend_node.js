const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const app = express();
app.use(cors());
app.use(express.json());
const url = "mongodb://Ali:123456@localhost:22222/Project?authSource=admin"; //you can use your mongodb server without --auth(Ali,123456)
const port = 33333;
let mongo;
async function main() {
    mongo = new mongodb.MongoClient(url);
    try {
        await mongo.connect();
        console.log("Connected to mongodb");
        app.listen(port, () => { console.log(`Server started on port ${port}`);});
    }
    catch (error) {
        console.error("Error connecting to mongodb,error: " + error);
    }
}
main();
app.post("/", async (req, res) => {
    const {username, password} = req.body;
        const collect = await mongo.db("Project").collection("users");
    try {
        const found = await collect.findOne({ username: username, password: password });
        if (found) {
            console.log("User is found.");
            res.status(200).json({ status: 200, message: "User found" });
        }
        else {
            console.log("User is not found.");
            res.status(404).json({ status: 404, message: "User not found" });
        }
    }
    catch (err) {
        console.error("Veritabanı sorgusu sırasında hata:", err);
    }
})