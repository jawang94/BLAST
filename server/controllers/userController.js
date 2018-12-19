const mongoose = require("mongoose"),
  User = mongoose.model("User"),
  Thread = mongoose.model("Thread"),
  Comment = mongoose.model("Comment"),
  bcrypt = require("bcrypt");

module.exports = {
  userIndex: (req, res) => {
    User.find({})
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },

  userNew: (req, res) => {
    console.log("Controller check", req.body);
    var hash = bcrypt.hashSync(req.body.password, salt);
    var user = new User({
      username: req.body.name,
      password: hash
    });
    user
      .save()
      .then(item => {
        res.json({ message: "Success", item });
      })
      .catch(err => {
        res.json({ message: "Failed!", err });
      });
  },

  login: (req, res) => {
    User.find({ username: req.body.username }, function(err, user) {
      if (err) {
        res.redirect("/");
      }
      else if (user) {
        console.log(user);
        console.log(user[0].password);
        bcrypt
          .compare(req.body.password, user[0].password)
          .then(result => {
            res.redirect("/home" + user[0]._id);
          })
          .catch(error => {
            res.redirect("/");
          });
      }
    });
  },

  userShow: (req, res) => {
    User.find({ _id: req.params.id })
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },

  //   userUpdate: (req, res) => {
  //     console.log("got that edit request", req.body);
  //     User.updateOne(
  //       { _id: req.params.id },
  //       {
  //         $set: {
  //           username: req.body.username,
  //         }
  //       }
  //     )
  //       .then(data => {
  //         res.json({ message: "Success!", data });
  //       })
  //       .catch(err => {
  //         console.log("Returned error", err);
  //         res.json({ message: "Error", error: err });
  //       });
  //   },

  //   userDelete: (req, res) => {
  //     console.log("Delete Controller Check");
  //     User.deleteOne({ _id: req.params.id })
  //       .then(data => {
  //         res.json({ message: "Succes", data });
  //       })
  //       .catch(err => {
  //         console.log("Returned error", err);
  //         res.json({ message: "Error", error: err });
  //       });
  //   },

  // threadIndex: (req, res) => {
  //   Thread.find({})
  //     .then(data => {
  //       res.json({ message: "Success", data: data });
  //     })
  //     .catch(err => {
  //       res.json({ message: "Error", error: err });
  //     });
  // },
  threadSearch: (req, res) => {
    Thread.find({category: req.body.text})
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },

  threadAcending: (req, res) => {
    Thread.find({})
      .sort({ title: 1})
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },
  threadDecending: (req, res) => {
    Thread.find({})
      .sort({ title: -1})
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },
  threadAcendingTime: (req, res) => {
    Thread.find({})
      .sort({ timestamps: 1})
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },
  threadDecendingTime: (req, res) => {
    Thread.find({})
      .sort({ timestamps: -1})
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },

  threadNew: (req, res) => {
    console.log("Controller check", req.body);
    var thread = new Thread({
      title: req.body.title,
      category: req.body.title
    });
    thread
      .save()
      .then(item => {
        res.json({ message: "Success", item });
      })
      .catch(err => {
        res.json({ message: "Failed!", err });
      });
  },

  threadShow: (req, res) => {
    Thread.find({ _id: req.params.id })
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },

  threadUpdate: (req, res) => {
    console.log("got that edit request", req.body);
    Thread.updateOne(
      { _id: req.params.id },
      {
        $set: {
          Threadname: req.body.Threadname
        }
      }
    )
      .then(data => {
        res.json({ message: "Success!", data });
      })
      .catch(err => {
        console.log("Returned error", err);
        res.json({ message: "Error", error: err });
      });
  },

  threadDelete: (req, res) => {
    console.log("Delete Controller Check");
    Thread.deleteOne({ _id: req.params.id })
      .then(data => {
        res.json({ message: "Succes", data });
      })
      .catch(err => {
        console.log("Returned error", err);
        res.json({ message: "Error", error: err });
      });
  },

  commentIndex: (req, res) => {
    Comment.find({})
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },

  commentNew: (req, res) => {
    console.log("Controller check", req.body);
    var comment = new Comment({
      content: req.body.content
    });
    comment
      .save()
      .then(item => {
        res.json({ message: "Success", item });
      })
      .catch(err => {
        res.json({ message: "Failed!", err });
      });
  },

  commentShow: (req, res) => {
    Comment.find({ _id: req.params.id })
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },

  commentUpdate: (req, res) => {
    console.log("got that edit request", req.body);
    Comment.updateOne(
      { _id: req.params.id },
      {
        $set: {
          content: req.body.content
        }
      }
    )
      .then(data => {
        res.json({ message: "Success!", data });
      })
      .catch(err => {
        console.log("Returned error", err);
        res.json({ message: "Error", error: err });
      });
  },

  commentDelete: (req, res) => {
    console.log("Delete Controller Check");
    Comment.deleteOne({ _id: req.params.id })
      .then(data => {
        res.json({ message: "Succes", data });
      })
      .catch(err => {
        console.log("Returned error", err);
        res.json({ message: "Error", error: err });
      });
  }
};
