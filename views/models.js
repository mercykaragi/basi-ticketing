var mysql = require("mysql");
var http = require('http');
var express = require('express');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "basiticketing"
});

app.post('/get-specific-buses', function(req, res){
    // console.log(req);
    var bToCity = req.body.queryResult.parameters.to_city;
    var bFromCity = req.body.queryResult.parameters.from_city;
    var busType = req.body.queryResult.parameters.seatType;

    console.log(bToCity);
    //var timePeriod = req.body.parameters.departure;

    var times = [];

    /*if (timePeriod == "morning")
        times = [8, 9, 10, 11, 12];
    else if (timePeriod == "evening")
        times = [16, 17, 18, 19, 20, 21, 22, 23];
    console.log(times);*/
    var bToCityid = '';
    var bFromCityid = '';
    // var get_id = "SELECT * FROM buscity WHERE CName=\'"+bToCity+"' OR CName='"+bFromCity+"'";

    //var query="SELECT b.*, a.CName FROM businformation AS b INNER JOIN buscity as a ON (b.BToCity = a.a.CName="+bToCity+")";
    // con.query(get_id, function(err, result, fields) {
    //     if (err) throw err;
    //     console.log("get data");
    //     var queryResponse= result;
    //     console.log(queryResponse[0]);
    //     console.log(queryResponse[1]);
    //     bToCityid = queryResponse[0];
    //     bFromCityid = queryResponse[1];
    // });
    // var query = "select * from businformation, buscity where bToCity='"+ bToCityid +"' and bFromCity='"+ bFromCityid + ' and BusType='"+ busTypeFirstClass +"'";
    // var query = "select * from businformation, buscity where bToCity='"+ bToCity +"' and bFromCity='"+ bFromCity +"'";
    var query = "select * from businformation where bToCity='"+ bToCity +"' and bFromCity='" +bFromCity+ "'";

    con.query(query, function(err, result, fields) {
        if (err) throw err;
        console.log("get data");
        var queryResponse= result;
        // console.log(queryResponse[0]);
        // console.log("Second...");
        // console.log(queryResponse[1]);
        console.log(result);
        bToCityid = queryResponse[0];
        bFromCityid = queryResponse[1];

        var finalData = [];

        res.send(JSON.stringify(result));

    });

    

    // con.query(query, function(err, result, fields){
    //     if(err) throw err;
    //     console.log("get data");
    //     console.log("##");
    //     var queryResponse = result;
    //     var finalData = [];
    //
    //     for (var i=0; i < queryResponse.length; i++){
    //
    //         var BTime = parseInt(queryResponse[i]["BTime"].split(":")[0]);
    //         // console.log("--" + BTime);
    //         // console.log(typeof BTime);
    //
    //         if (times.includes(BTime)){
    //             console.log("Found...");
    //             finalData.push(queryResponse[i]);
    //         }
    //
    //     }
    //
    //     console.log(finalData);
    //
    //     res.send(JSON.stringify(finalData));
    // });
    console.log("##");

   con.close;
});


app.get('/get-all-buses', function(req, res){


    //if (err) throw err;
    var query = "select * from businformation";

    con.query(query, function(err, result, fields) {
        if (err) throw err;
        console.log("sent data");
        res.send(JSON.stringify(result));
    });

   con.close;
});

app.listen(3000, function(){
    console.log("...");
    con.connect(function(err){
       if (err) throw err;
    });
});
