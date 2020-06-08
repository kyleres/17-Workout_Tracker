//dependencies
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

//port
const PORT = process.env.PORT || 5000

//rename express function to app
const app = express();

//code for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//routes
app.use(require("./controllers/api-routes"));
app.use(require("./controllers/html-routes"));

//sync to mongoDB using mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

//start server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});