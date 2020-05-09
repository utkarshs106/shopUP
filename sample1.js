const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.send("hii i got you");
});

app.listen(5000, function() {
  console.log("Server is running on port 3000");
});
