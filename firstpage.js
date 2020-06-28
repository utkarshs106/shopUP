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

app.post("/mainPage",function(req,res){
  var link=[
 "https://i.pinimg.com/originals/e4/19/3f/e4193f97140f75c00208ecaf67fc43e7.jpg",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRzjugdhDTYQjoAYTBmrCWu0HOaLLGf_YVTgnAjM3o9J9twwEMv&usqp=CAU",
 "data:image/jpeg;base64,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", 
 "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcThLgJdqZsWfSuWs71T4dt_1w3wAYTFxFVbxjmL_KT5zq75YMpk&usqp=CAU",
 "data:image/jpeg;base64,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",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzYTZZQYOdwgPs7CeWGpAPq_AW9-PAZBOHF5oSECu2sN-LMavC&usqp=CAU",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQY43jBVh5LCztlsNtmvGcpGAIUS-mHsc3mago4hKaR-K5DBXaC&usqp=CAU",
 ];
  var l1=["Stationary","medics","Hardware","Electronics","Cosmetics","Food","groocery"];
  res.render("mainpage",{
    l1: l1,
    link: link
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
  var sql2="create table "+name+phone+shopname+" (ItemId int NOT NULL AUTO_INCREMENT, Item_Name varchar(50),Item_Price varchar(50),primary key (ItemId))";
  con.query(sql2,function(err){
    if(err) throw err;
  });
  var sql3="ALTER TABLE blog"+name+phone+shopname+" AUTO_INCREMENT=1";
  con.query(sql3,function(result,err){
    if(err) throw err;
  })
});

app.post("/shop", function(req, res) {
  var list2 = [];
  var name = String(req.body.n1);
  var phone = Number(req.body.phone);
  var shop = String(req.body.shop);

  var sql1 = "select * from " + name + phone + shop + " order by Item_Name"
  con.query(sql1, function(err, result) {
    if (err) throw err;

    for (var j = 0; j < result.length; j++) {
      var q=[];
      q.push(result[j].Item_Name);
      q.push(result[j].Item_Price);
      q.push(result[j].ItemId);
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
  var name = String(req.body.name);
  var phone = Number(req.body.phone);
  var shop = String(req.body.shop);
  var item_name=String(req.body.itemName);
  var item_price =Number(req.body.price);

  var sql ="insert into "+name+phone+shop+"(Item_Name , Item_price) values('"+item_name+"',"+item_price+")"

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

app.post("/deleteItemsFromShop",function(req,res){
  var deleteList=req.body.deleteList;
  var name = req.body.name;
  var phone = req.body.phone;
  var shop = req.body.shop;
  
  for(var i = 0;i<deleteList.length;i++){
    var sql="delete from "+name+phone+shop+" where Item_Name = '"+deleteList[i]+"'";
    con.query(sql,function(err,result){
      if(err) throw err;
    })
  }
});
app.post("/updateShopDataToDatabase",function(req,res){

  var data = req.body.data;
  var savedData= req.body.savedData;
  name = req.body.name;
  phone = req.body.phone;
  shop = req.body.shop;
  
  var sql="UPDATE "+name+phone+shop+" set Item_Name = '"+savedData[0]+"' , Item_Price = '"+savedData[1]+"' where Item_Name = '"+data[0]+"' and Item_Price = '"+data[1]+"'";
  con.query(sql,function(err,result){
    if(err) throw(err);
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
