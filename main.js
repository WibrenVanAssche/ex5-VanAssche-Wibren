var express = require('express');
var parser = require('body-parser');

var dalLocations = require("./LocationStorage.js");
var dalAanwezigheden = require("./AanwezighedenStorage.js");
var dalSales = require("./SalesStorage.js");
var dalProducts = require("./ProductStorage.js");

var validator = require("./Validate.js");

var app = axpress();
app.use(parser.json());

app.get("/Locations", function (request, response) {
  
  response.send(dalLocations.listAllLocations());
});

app.get("/Locations/:id", function (request, response) {
  var Location = dalLocations.findLocation(request.params.id);
  if(Location) {
    response.send(Location);
  }else {
    response.status(404).send();
  }
});
 
app.post("/Locations", function (request, response) {
  var Location = request.body;

  var errors = validation.fieldsNotEmpty(Location, "Naam", "Stad", "Adres","Capaciteit");
  if (errors){
    response.status(400).send({msg:"Following field(s) are mandatory:"+errors.concat()});
    return;
  }
  
  var existingLocation = dal.findLocation(Location.Naam);
  if(existingLocation){
    response.status(409).send({msg:"Naam moet uniek zijn, deze bestaat al", link:"../Locations/"+existingLocation.id});
    return;
  }
  Location.id=Location.Naam;
  dalLocations.saveLocation(Location);
  response.status(201).location("../Locations/"+Location.id).send();
});


app.listen(4567);
console.log("Server started");