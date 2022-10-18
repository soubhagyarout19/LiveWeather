const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");


const app = express();

app.use(bodyparser.urlencoded({extended: true}))


app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");     
})

app.post("/", function(req, res){
 
    const query = req.body.cityName;
const apiKey = "a005a8beebb384eea4b4d5b9a69b4860";
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;

https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        // console.log(temp);
        const description = weatherData.weather[0].description;
        // console.log(description);

        res.write("<h1>Temperature in" + query + " is " + temp + "°C </h1>");
        res.write("<p>The weather is currently" + description + "</p>");

        res.send();
    })
})
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
})

