var mysql = require("mysql");
const express = require("express");
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require("body-parser");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "shopup"
});
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post("/signup", function(req, res) {
  var name = String(req.body.name);
  var phone = String(req.body.phone);
  var password = String(req.body.password);
  var city = String(req.body.city);
  var dob = String(req.body.dob);
  var state = String(req.body.state);
  var contry = String(req.body.Country);

  var sql = "insert into profile values('" + name + "','" + phone + "','" + password + "','" + city + "','" + dob + "','" + state + "','" + contry + "')"
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
  var sql1 = "create table " + name + phone + "(shopname varchar(50))"
  con.query(sql1, function(err) {
    if (err) throw err;
  });
});

app.post("/login", function(req, res) {
  var list1 = []
  var phone = Number(req.body.phone);
  var pass = String(req.body.password);
  var sql = "select name , phone from profile where Phone ='" + phone + "' and Password='" + pass + "' "
  con.query(sql, function(err, result) {
    if (err) throw err;
    var n1 = result[0].name;
    var p1 = result[0].phone;
    var sql1 = "select shopname from " + n1 + p1 + ""
    con.query(sql1, function(err, result1) {
      if (err) throw err;
      for (var j = 0; j < result1.length; j++) {
        list1.push(result1[j].shopname)
      }

      if (result) {
        res.render("shoplist", {
          name: n1,
          phone: p1,
          l1: list1
        });
      }
    });
  });
});

app.post("/addShop", function(req, res) {
  var shopname = String(req.body.shopname);
  var name =   String(req.body.name);
  var phone =  String(req.body.phone);

  var sql1="insert into "+name+phone+" values('"+shopname+"')";
  con.query(sql1,function(err){
    if(err) throw err;
  });
  var sql2="create table "+name+phone+shopname+" (Item_Name varchar(50),Item_Price varchar(50))";
  con.query(sql2,function(err){
    if(err) throw err;
  });
});

app.post("/shop", function(req, res) {
  var list2 = [];
  var name = String(req.body.n1);
  var phone = Number(req.body.phone);
  var shop = String(req.body.shop);

  var sql1 = "select * from " + name + phone + shop + ""
  con.query(sql1, function(err, result) {
    if (err) throw err;

    for (var j = 0; j < result.length; j++) {
      var q=[];
      q.push(result[j].Item_Name);
      q.push(result[j].Item_Price);
      list2.push(q);
    }
  res.render("shop", {
    shop: shop,
    name: name,
    phone: phone,
    items: list2
    });
  });
});

app.post("/addItem", function(req, res) {
  var list2 = [];
  console.log("entered");
  var name = String(req.body.name);
  var phone = Number(req.body.phone);
  var shop = String(req.body.shop);
  var item_name=String(req.body.itemName);
  var item_price =Number(req.body.price);

  var sql ="insert into "+name+phone+shop+" values('"+item_name+"',"+item_price+")"

  con.query(sql, function(err){
    if(err) throw err;
  });

  var sql1 = "select * from " + name + phone + shop + ""
  con.query(sql1, function(err, result) {
    if (err) throw err;

    for (var j = 0; j < result.length; j++) {
      var q = [];
      q.push(result[j].Item_Name);
      q.push(result[j].Item_Price);
      list2.push(q);
    }
  res.render("shop", {
    items: list2,
    shop :shop,
    name:name,
    phone:phone,
    });
  });
});

app.post("/deleteShop",function(req,res){
  var name = String(req.body.name);
  var phone = String(req.body.phone);
  var shop = String(req.body.shop);
  var sql="drop table "+name+phone+shop+""
  con.query(sql,function(err,result){
    if(err) throw err;
  });
  var sql1="delete from "+name+phone+" where shopname = '"+shop+"'";
  con.query(sql1,function(err,result){
    if(err) throw err;
  });
});



app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
