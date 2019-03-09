const express = require('express');
const path = require('path')

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var tables= [{
    id: 1,
    name: "Dave",
    email: "hankatola@me.com",
    phone: "123-456-3213"
},
{
    id: 2,
    name: "Maggie",
    email: "betty_crocker@me.com",
    phone: "919-453-9867"
}]

var waitList = [{
    id: 6,
    name: "Blaine",
    email: "bdiddy428",
    phone: "914-432-8976"
}]


// send to the page
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});



// get the tables
app.get("/tables", function(req, res){
    return res.send(tables)
});

// and the waitlist
app.get("/waitList", function(req, res){
    return res.send(waitList)
});

// add to the lists
// some stuff
// goes  here

// Make the server listen
app.listen(PORT, function(){
    console.log("App is listening on port " + PORT);
});