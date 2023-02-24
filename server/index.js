// const express = require('express'); // Import express module // Bu metotu kullanabilirsin.
import express from "express"; // package.json main altina type: module yazarak import kullanabilirsin.
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();    // .env dosyasini okumak icin gerekli.

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());       // Http isteklerini kabul edilmesini saglar.

app.get("/", (req, res) => {
    res.json({
        author: "Tayfun",
        message: "Hello World!",
    })
});

app.use("/Posts", postRoutes); // Bu satir ile postRoutes.js dosyasindaki tum istekler /posts ile baslar.

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,  // Bu iki satir mongoose ile baglanti kurmak icin gerekli.
        useUnifiedTopology: true,   // Bu iki satir mongoose ile baglanti kurmak icin gerekli. Yoksa warning verir.
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`); // Baglanti saglandiginda calisir.
        });
    })
    .catch((error) => {
        console.log(error.message); // Baglanti saglanamazsa calisir.
    });