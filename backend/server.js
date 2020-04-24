const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");

//setup express
const app = express();
app.use(cors());
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// setup routes
app.use("/posts", require("./routes/postRoutes.js"));
// if google login failed
app.get("/failed", (req, res) => res.send("You failed to login"));
// if google login success
app.get("/success", (req, res) => res.send(`Welcome ${req.user.email}!`));

// TODO: Do something with this! You can put it into a sepreate route file
app.get(
  "/google", // *: you can add back the /auth after confirming this route works
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback", // *: you can add back the /auth after confirming this route works
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/success");
  }
);
// setup server
const PORT = process.env.PORT || 5000;
console.log("starting server");
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// setup mongoose
console.log("Connecting to MongoDB");
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) return console.error(err);
  console.log("MongoDB connection established");
});