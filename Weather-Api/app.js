const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) { //CLIENTSIDE
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {

//  console.log(req.body.cityName); 
 
  const query = req.body.cityName;
  const apiKey = "f33fb60693f514855d845d49c2158191";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+ apiKey;

  https.get(url, function (response) { //API SIDE
      // console.log(response.statusCode);

      response.on("data", function (data) {
          console.log(data);// hexadecimal form

          const weatherData = JSON.parse(data);
          console.log(weatherData); //object form

          // const object = {
          //     name: "Pelep",
          //     age: 23,
          //     favoriteFood: "Fried Chicken",
          //     sports: "MMA"
          // }
          // console.log(JSON.stringify(object));

          const temp = weatherData.main.temp;
          console.log(temp +" celcius");

          const description = weatherData.weather[0].description;
          console.log("Description: " + description);

          const wind = weatherData.wind.speed;
          console.log("Wind Speed: " + wind);

          const country = weatherData.sys.country;
          console.log("Country: "+country);

          const icon = weatherData.weather[0].icon;
          const iconURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
          console.log("Temperature visual is: " + icon);

          res.write("<h1><center>The temperature in "+ query +" is " + temp + " dregrees celcius </h2></center>");
          res.write("<h2><center>The weather description is: " + description + "</h2></center>");
          res.write("<center><img src=" + iconURL + "></center>");
          res.send();
      });

  });

//   // res.send("IS IT WORKING FINE?")
    
});


app.listen(3000, function (req, res) {
    console.log("Server is running on port 3000");

});