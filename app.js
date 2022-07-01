// Otetaan tarvittavat moduulit käyttöön
// Including necessary modules
const dayjs = require("dayjs");
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors')
const app = express();
require('dotenv').config();

// This is needed to deploy the app on Heroku
const path = require('path');
app.use(express.static(path.join(__dirname, 'myfrontend/build')));
// Enabling cors
app.use(cors());
// support parsing of application/json type post data
app.use(express.json());
// Specifying the port
const port = process.env.PORT || 5000;

// Specifying the connection address and options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connecting to the database
mongoose.connect(process.env.MONGODB_URI || uri, options);

const db = mongoose.connection;
console.log(db);

// Defining a mongoose model
const Disc = mongoose.model(
    "discgolf_bag",
    {
        date: String,
        brand: String,
        mold: String,
        color: String,
        condition: Number,
        weight: Number
    },

    "discs"  // This is the collection that is going to be used
);
// Handling errors / success
db.on("error", function () {
    console.log("Connection error!");
});

db.once("open", function () {
    console.log("Connected to the database!");
});

// parsing support
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// Creating routes and functionalities

// Retrieving ALL discs
app.get("/api/getall", (_req, res) => {
    Disc.find({}, null, (err, results) => {
        // Handling errors, returning status
        if (err) {
            res.status(500).json("Something went wrong " + err);
            console.log("Something went wrong " + err);
        }
        // success
        else {
            res.status(200).json(results);
            console.log(results);
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    // Poimitaan id talteen ja välitetään se tietokannan poisto-operaatioon
    // Getting the id and sending information to the database
    const id = req.params.id;

    Disc.findById(id, (err, results) => {
        // Handling errors, returning status
        if (err) {
            res.status(500).json("Something went wrong " + err);
            console.log("Something went wrong " + err);
        }
        // success
        else {
            res.status(200).json("Found disc by id: " + results);
            console.log("Found disc " + results);
        }
    });
});

// Luodaan uusi tallennettava olio
// Creating a new object
app.post("/api/add", (req, res) => {
    const newDisc = new Disc({
        date: dayjs().format('DD.MM.YYYY'),
        brand: req.body.brand,
        mold: req.body.mold,
        color: req.body.color,
        condition: req.body.condition,
        weight: req.body.weight,
    });
    // Tallennetaan olio tietokantaan
    // Saving the object to the database
    newDisc.save((err, results) => {
        // Handling errors
        if (err) {
            res.status(500).json("Something went wrong: " + err);
            console.log("Something went wrong" + err);
        }
        // Sending the succesful results back
        else {
            res.status(200).json("Lisätty tietokantaan: \n" + results);
            console.log("Added:" + results);
        }
    })

});

// Update by id
app.put("/api/update/:id", (req, res) => {
    // Poimitaan id talteen
    const id = req.params.id;

    Disc.findByIdAndUpdate(id, {
        brand: req.body.brand,
        mold: req.body.mold,
        color: req.body.color,
        condition: req.body.condition,
        weight: req.body.weight
    }, { new: true }, (err, results) => {
        if (err) {
            res.status(500).json("Järjestelmässä tapahtui virhe" + err);
            console.log("Järjestelmässä tapahtui virhe" + err);
        }
        // Muuten lähetetään tietokannan tulokset selaimelle 
        else {
            res.status(200).json("Päivitetty: \n" + results);
            console.log("Päivitetty: " + results);
        }
    })
});

// Poistetaan kiekko id:n perusteella
// Finding a disc by ID and deleting it
app.delete("/api/delete/:id", (req, res) => {
    // Poimitaan id talteen ja välitetään se tietokannan poisto-operaatioon
    // Getting the id and sending information to the database
    const id = req.params.id;

    Disc.findByIdAndDelete(id, (err, results) => {
        // Handling errors
        if (err) {
            console.log("Something went wrong: " + err);
            res.status(500).json("Something went wrong.");
        } // Handling error when there is nothing to delete with the selected id
        else if (results == null) {
            res.status(200).json("There is nothing to remove.");
            console.log("There is nothing to remove.");
        } // Successful request
        else {
            console.log("Removed disc" + results);
            res.status(200).json("Removed disc: " + results);
        }
    });
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./myfrontend/build'))
}

// Web-palvelimen luonti Expressin avulla
app.listen(port, function () {
    console.log("Using port " + port);
});