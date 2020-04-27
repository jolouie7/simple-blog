const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/userModel");
// const mongoose = require("mongoose");
// const express = require("express");
const findOrCreate = require("mongoose-findorcreate");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// passport.use(
//   new GoogleStrategy(
//     {
//       // ! DO I NEED TO IMPORT DOTENV?
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:5000/google/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       // use the profile info (mainly profile id) to check if the user is registered in ur db
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//     }
//   )
// );

//Use Google strategy
passport.use(
  new GoogleStrategy(
    {
      // ! DO I NEED TO IMPORT DOTENV?
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //findOrCreate method from https://stackoverflow.com/questions/20431049/what-is-function-user-findorcreate-doing-and-when-is-it-called-in-passport
      //check user table for anyone with a google ID of profile.id
      User.findOne(
        {
          "google.id": profile.id,
        },
        function (err, user) {
          if (err) {
            return done(err);
          }
          //No user was found... so create a new user with values from google (all the profile. stuff)
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              username: profile.username,
              provider: "google",
              //now in the future searching on User.findOne({'google.id': profile.id } will match because of this next line
              google: profile._json,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            //found user. Return
            return done(err, user);
          }
        }
      );
    }
  )
);