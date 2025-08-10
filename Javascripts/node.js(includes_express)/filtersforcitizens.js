const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb://Ali:123456@localhost:22222/Project?authSource=admin";
const client = new MongoClient(uri);

let collection;

async function connectDB() {
    await client.connect();
    const db = client.db("Project");
    collection = db.collection("citizens");
    console.log("Connection between backend and MongoDB is successful!");
}
connectDB().catch(err => console.error(err));

app.post('/api/citizens', async (req, res) => {
    try {
        const { ad, soyad, kan, sac, sehir } = req.query;
        const query = {};

        if (ad) query.ad = { $regex: ad, $options: 'i' };
        if (soyad) query.soyad = { $regex: soyad, $options: 'i' };
        if (kan) query.kanGrubu = kan;
        if (sac) query.sacRengi = sac;
        if (sehir) query.dogumSehri = { $regex: sehir, $options: 'i' };

        const results = await collection.find(query).toArray();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

app.listen(3000, () => console.log('Server 3000 portunda çalışıyor'));
