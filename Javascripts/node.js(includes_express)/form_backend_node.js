const express = require("express");
const cors = require("cors");
const jeb = require("jsonwebtoken")
const mongodb = require("mongodb");
const app = express();
app.use(cors());
app.use(express.json());
const secretKey = "U6;tyg4MHF#Xx5'Gl@q_7CL1[d%R";
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
            const token = jeb.sign({ username: username }, secretKey, { expiresIn: '40m' });
            res.status(200).json({token,message: "Logged in successfully"});
            console.log("User logged in successfully");
        }
        else {
            console.log("Didn't logged in successfully.");
            res.status(404).json({ message: "User does not exist" });
        }
    }
    catch (err) {
        console.error("Veritabanı sorgusu sırasında hata:", err);
    }
})