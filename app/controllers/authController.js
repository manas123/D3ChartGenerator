module.exports = {
  login: function(req, res, next) {
    res.render("./auth/login", { messages: req.flash() });
  },
  signup: function(req, res, next) {
    res.render("./auth/register", { messages: req.flash() });
  },
  logout: function(req, res, next) {
    req.session.destroy(function(err) {
      res.redirect("/login");
    });
  }
};
