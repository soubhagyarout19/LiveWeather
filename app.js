const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");


const app = express();

// for css and other
app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended: true}))


app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");     
})

app.post("/", function(req, res){
 
    const query = req.body.cityName;
const apiKey = "HERE ENTER YOUR API KEY";
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;

https.get(url, function(response){
    console.log(response.statusCode);

    if(response.statusCode == 200){
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
    }
    else{
        res.send("Can't get information of that place");
    }
})
})

.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});

