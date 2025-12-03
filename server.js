const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const uri = "mongodb+srv://hotelUser:amineiset123@cluster0.pwxaicw.mongodb.net/hotelDB?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        const db = client.db("hotelDB");
        const bookings = db.collection("bookings");

        // استقبال بيانات الحجز
        app.post('/book', async (req, res) => {
            const data = req.body;
            await bookings.insertOne(data);
            res.json({ message: "تم الحجز بنجاح!" });
        });

        // تشغيل السيرفر
        app.listen(3000, () => console.log("Server running on http://localhost:3000"));
    } catch (err) {
        console.error(err);
    }
}

main();
