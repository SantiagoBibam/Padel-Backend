const express = require('express');
const app = express();
const mysql = require('mysql');
const fetch = require('node-fetch');
const cors = require("cors");
app.use(cors())

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'prueba'
  });
connection.connect();

app.get('/main', function (req, res) {
  let category = parseInt(req.query.category);
  try{
    connection.query('SELECT affiliate_number, name, lastname, ranking_points FROM prueba.players where category =' + category + ' ORDER BY ranking_points desc ', function(err, rows, fields) {
    if (err) {
      res.json({
        error: err.message
      });
    }
    res.json(rows);
  });
 }
 catch(error){
   res.json({
     error: error.message
   });
 }
});

app.get('/select', function (req, res) {
  try{
    connection.query('SELECT category_code, category_name FROM prueba.categories ORDER BY category_code asc', function(err, rows, fields) {
    if (err) {
      res.json({
        error: err.message
      });
    }
    res.json(rows);
  });
 }
 catch(error){
   res.json({
     error: error.message
   });
 }
});

app.get('/modify', function (req, res) {
  let affiliateNumber = parseInt(req.query.affiliateNumber);
  let name1 = req.query.name;
  let lastname = req.query.lastname;
  let id = req.query.id;
  let category = req.query.category;
  let rankingPoints = req.query.ranking_points;
  let contact = req.query.contact;
  try{
    connection.query("UPDATE players SET name='" + name1 + "', lastname='" + lastname + "', id='" + id + "', category='" + category + "', ranking_points='" + rankingPoints + "', contact='" + contact + "' where affiliate_number=" + affiliateNumber, function(err, rows, fields) {
    if (err) {
      res.json({
        error: err.message
      });
    }
    res.json(rows);
  });
 }
 catch(error){
   res.json({
     error: error.message
   });
 }
  });

app.get('/edit', function (req, res) {
  let affiliateNumber = req.query.affiliateNumber;
  try{
    connection.query('SELECT affiliate_number, name, lastname, id, category, ranking_points, contact FROM prueba.players where affiliate_number = ' + affiliateNumber, function(err, rows, fields) {
      if (err) {
      res.json({
        error: err.message
      });
    }
    res.json(rows);
  });
 }
 catch(error){
   res.json({
     error: error.message
   });
 }
});

app.get('/suscribe', function (req, res) {
  let name1 = req.query.name;
  let lastname = req.query.lastname;
  let id = req.query.id;
  let category = req.query.category;
  let rankingPoints = req.query.ranking_points;
  let contact = req.query.contact;
  try{
    connection.query("INSERT INTO players VALUES (null, '" + name1 + "', '" + lastname + "', " + id + ", " + category + ", " + rankingPoints + ", '" + contact + "')", function(err, rows, fields) {
      if (err) {
        res.json({
          error: err.message
        });
      }
      res.json(rows);
    });
   }
   catch(error){
     res.json({
       error: error.message
     });
   }
  });

app.get('/unsuscribe', function (req, res) {
  let affiliateNumber = parseInt(req.query.affiliateNumber);
  try{
    connection.query("DELETE FROM players WHERE affiliate_number = " + affiliateNumber, function(err, rows, fields) {
    if (err) {
      res.json({
        error: err.message
      });
    }
    res.json(rows);
  });
 }
 catch(error){
   res.json({
     error: error.message
   });
 }
});

app.get('/category', function (req, res) {
  let categoryCode = parseInt(req.query.categoryCode);
  try{
    connection.query("SELECT category_code, category_name FROM categories WHERE category_code = " + categoryCode, function(err, rows, fields) {
    if (err) {
      res.json({
        error: err.message
      });
    }
    res.json(rows);
  });
 }
 catch(error){
     res.json({
     error: error.message
   });
 }
});

app.get('/categorysuscribe', function (req, res) {
  let categoryCode = parseInt(req.query.categoryCode);
  let categoryName = req.query.categoryName;
  try{
    connection.query("INSERT INTO categories VALUES (" + categoryCode + ", '" + categoryName + "')" , function(err, rows, fields) {
     if (err) {
      res.json({
        error: err.message
      });
    }
    res.json(rows);
  });
 }
 catch(error){
     res.json({
     error: error.message
   });
 }
});

app.get('/categoryedit', function (req, res) {
  let categoryCode = parseInt(req.query.categoryCode);
  let categoryName = req.query.categoryName;
  try{
    connection.query("UPDATE categories SET category_name = '" + categoryName + "' WHERE category_code = " + categoryCode , function(err, rows, fields) {
      
    if (err) {
      res.json({
        error: err.message
      });
    }
    res.json(rows);
  });
 }
 catch(error){
     res.json({
     error: error.message
   });
 }
});

app.get('/categoryunsuscribe', function (req, res) {
  let categoryCode = parseInt(req.query.categoryCode);
    try{
    connection.query("DELETE FROM categories WHERE category_code = " + categoryCode , function(err, rows, fields) {
      
    if (err) {
      res.json({
        error: err.message
      });
    }
    res.json(rows);
  });
 }
 catch(error){
     res.json({
     error: error.message
   });
 }
});

process.on("SIGTERM", function(){
  if(connection){
    connection.end();
  }
})

var server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});
