const express = require("express");
const session = require("express-session");

require("./config/db");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: false
}));

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/jobs"));
app.use("/", require("./routes/application"));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});