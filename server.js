const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

try{
mongoose.connect(process.env.MONGOD_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
} catch(err){
    console.log("Connection Error", err)
};

app.use(require("./routes"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
