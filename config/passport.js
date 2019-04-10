var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../app/models");
var bCrypt = require("bcrypt");

module.exports = function() {
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        if (req.body.password === req.body.confirm_password) {
          var generateHash = function(password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
          };
          db.User.findOne({ where: { email: email } }).then(function(user) {
            if (user) {
              return done(null, false, { message: "Email already exists" });
            } else {
              var hashpassword = generateHash(password);
              var data = {
                email: email,
                password: hashpassword,
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                phoneno: req.body.phoneno
              };
              db.User.create(data).then(function(newUser, created) {
                if (!newUser) {
                  return done(null, false, {
                    message: "Unable to create new User on this email"
                  });
                }
                if (newUser) {
                  return done(null, newUser);
                }
              });
            }
          });
        } else {
          return done(null, false, {
            message: "Passwords don't match please re-enter the credentials"
          });
        }
      }
    )
  );

  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        var isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };
        db.User.findOne({ where: { email: email } })
          .then(function(user) {
            if (!user) {
              return done(null, false, { message: "Email does not exist" });
            }
            if (!isValidPassword(user.password, password)) {
              return done(null, false, { message: "Incorrect password." });
            }
            var userinfo = user.get();
            console.log("user info :", userinfo);
            return done(null, user);
          })
          .catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    if (user) {
      return done(null, {
        uuid: user.uuid,
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastname: user.lastName,
        phoneno: user.phoneno
      });
    }
  });

  passport.deserializeUser(function(user, done) {
    console.log("deserializeUser:", user);
    db.User.findOne({ where: { email: user.email } }).then(project => {
      if (err) {
        console.log("Error loading user: " + err);
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
};
