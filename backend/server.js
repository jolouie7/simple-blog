const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passportSetup");

//setup express
const app = express();
app.use(cors());
app.use(express.json());

//create session
app.use(
  cookieSession({
    name: "simple-blog-session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// move to sepreate file to be more organized
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

// setup routes
app.use("/posts", require("./routes/postRoutes.js"));
// get users
app.use("/users", require("./routes/userRoutes.js"));
// when logging out
app.get("/", (req, res) => res.send("You are not logged in!"));
// if google login failed
app.get("/failed", (req, res) => res.send("You failed to login"));
// if google login success
app.get("/success", isLoggedIn, (req, res) => res.send(`Welcome ${req.user.name}!`));

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

// logout route
app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
})

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