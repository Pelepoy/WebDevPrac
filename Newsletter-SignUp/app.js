//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    // console.log(firstName, lastName, email);P

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    const jsonData = JSON.stringify(data); //flatpack 
    const url = "https://us13.api.mailchimp.com/3.0/lists/90721b0e53";
    const options = {
        method: "POST",
        auth: "pelep:9c04e446b08e05d337fd40c1883e09ce-us13"
    }
    const request = https.request(url, options, function (response) { //post data to external resource // https server (API SERVER)
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});



app.post("/failure", function(req, res){

   res.redirect("/");
});



app.listen(process.env.PORT || 3000, function () {

    console.log("Server is runnning on port 3000.");
});


// API KEY MAILCHIMP
// 5ca762c326d3fa504d14456395fe6853-us13
// b3952296260b84f1553a2bd27f578073-us13
// 9c04e446b08e05d337fd40c1883e09ce-us13

// LIST ID
// 90721b0e53