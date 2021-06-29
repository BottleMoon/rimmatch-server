const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", function() {
    console.log("Connection Failed!");
});

db.once("open", function() {
    console.log("Connected!");
});