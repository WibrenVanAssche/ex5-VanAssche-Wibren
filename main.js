var express = require('express');
var parser = require('body-parser');

var dalLocations = require("./LocationStorage.js");
var dalAanwezigheden = require("./AanwezighedenStorage.js");
var dalSales = require("./SalesStorage.js");
var dalProducts = require("./ProductStorage.js");

var validator = require("./Validate.js");

var app = axpress();
app.use(parser.json());

//LOCATIONS
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

  var errors = validator.fieldsNotEmpty(Location, "Naam", "Stad", "Adres","Capaciteit");
  if (errors){
    response.status(400).send({msg:"Following field(s) are mandatory:"+errors.concat()});
    return;
  }
  
  var existingLocation = dalLocations.findLocation(Location.Naam);
  if(existingLocation){
    response.status(409).send({msg:"Naam moet uniek zijn, deze bestaat al", link:"../Locations/"+existingLocation.id});
    return;
  }
  Location.id=Location.Naam;
  dalLocations.saveLocation(Location);
  response.status(201).location("../Locations/"+Location.id).send();
});

//PRODUCTS
app.get("/Products", function (request, response) {
  
  response.send(dalProducts.listAllProducts());
});

app.get("/Products/:id", function (request, response) {
  var Product = dalProducts.findProduct(request.params.id);
  if(Product) {
    response.send(Product);
  }else {
    response.status(404).send();
  }
});
 
app.post("/Products", function (request, response) {
  var Product = request.body;

  var errors = validator.fieldsNotEmpty(Product, "productid", "Productname", "price");
  if (errors){
    response.status(400).send({msg:"Following field(s) are mandatory:"+errors.concat()});
    return;
  }
  
  var existingProduct = dalProducts.findProduct(Product.productid);
  if(existingProduct){
    response.status(409).send({msg:"Productid moet uniek zijn, deze bestaat al", link:"../Products/"+existingProduct.id});
    return;
  }
  Product.id=Product.productid;
  dalProducts.saveProduct(Product);
  response.status(201).location("../Products/"+Product.id).send();
});

//SALES
app.get("/Sales", function (request, response) {
  
  response.send(dalSales.listAllSales());
});

app.get("/Sales/:id", function (request, response) {
  var Sale = dalSales.findLocation(request.params.id);
  if(Sale) {
    response.send(Sale);
  }else {
    response.status(404).send();
  }
});
 
app.post("/Sales", function (request, response) {
  var Sale = request.body;

  var errors = validator.fieldsNotEmpty(Sale, "Date", "[Productid]", "revenue", "id");
  if (errors){
    response.status(400).send({msg:"Following field(s) are mandatory:"+errors.concat()});
    return;
  }
  
  var existingSale= dalSales.findSale(Sale.id);
  if(existingSale){
    response.status(409).send({msg:"id moet uniek zijn, deze bestaat al", link:"../Sales/"+existingSale.id});
    return;
  }
 //onderstaande is denk ik overbodig
 // Sale.id=Sale.id;  
  dalSales.saveSale(Sale);
  response.status(201).location("../Sales/"+Sale.id).send();
});

//AANWEZIGHEDEN

app.listen(4567);
console.log("Server started");