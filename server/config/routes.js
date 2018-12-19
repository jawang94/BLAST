var controllers = require("../controllers/userController.js");

module.exports = function(app) {
  app.get("/user", function(req, res) {
    controllers.userIndex(req, res);
  });
  app.get("/user/:id", function(req, res) {
    controllers.userShow(req, res);
  });
  app.post("/user", function(req, res) {
    controllers.userNew(req, res);
  });
  app.put("/user/:id", function(req, res) {
    controllers.userUpdate(req, res);
  });
  app.delete("/user/delete/:id", function(req, res) {
    controllers.userDelete(req, res);
  });

  app.get("/thread", function(req, res) {
    controllers.threadIndex(req, res);
  });

  app.get("/thread/search", function(req, res) {
    controllers.threadSearch(req, res);
  });
  app.get("/thread/ascending", function(req, res) {
    controllers.threadAscending(req, res);
  });
  app.get("/thread/descending", function(req, res) {
    controllers.threadDescending(req, res);
  });
  app.get("/thread/asctime", function(req, res) {
    controllers.threadAscendingTime(req, res);
  });
  app.get("/thread/desctime", function(req, res) {
    controllers.threadDescendingTime(req, res);
  });

  app.get("/thread/:id", function(req, res) {
    controllers.threadShow(req, res);
  });
  app.post("/thread", function(req, res) {
    controllers.threadNew(req, res);
  });
  app.put("/thread/:id", function(req, res) {
    controllers.threadUpdate(req, res);
  });
  app.delete("/thread/delete/:id", function(req, res) {
    controllers.threadDelete(req, res);
  });

  app.get("/comment", function(req, res) {
    controllers.commentIndex(req, res);
  });
  app.get("/comment/:id", function(req, res) {
    controllers.commentShow(req, res);
  });
  app.post("/comment", function(req, res) {
    controllers.commentNew(req, res);
  });
  app.put("/comment/:id", function(req, res) {
    controllers.commentUpdate(req, res);
  });
  app.delete("/comment/delete/:id", function(req, res) {
    controllers.commentDelete(req, res);
  });
};
