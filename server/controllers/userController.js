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

  userThreads: (req, res) => {
    User.find({ _id: req.params.id }, { threads: 1 });
  },

  userNew: (req, res) => {
    console.log("Controller check", req.body);
    var salt = bcrypt.genSaltSync(10);
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

  userLogin: (req, res) => {
    User.find({ username: req.body.name }, function(err, user) {
      if (err) {
        res.redirect("/");
      } else if (user) {
        console.log(user);
        console.log(user[0].password);
        bcrypt
          .compare(req.body.password, user[0].password)
          .then(data => {
            console.log("data looks like this:", data);
            if (req.session.loginID) {
              res.json({ message: "Success", data: user[0] });
            } else {
              req.session.loginID = user[0]._id;
              res.json({ message: "Success", data: user[0] });
            }
          })
          .catch(err => {
            res.json({ message: "Error", error: err });
          });
      }
    });
  },

  getLogin: (req, res) => {
    User.find({ _id: req.session.loginID }, function(err, user) {
      if (err) {
        res.redirect("/");
      } else if (user) {
        if (user.length < 1) {
          var temp = null;
          res.json(temp);
        } else {
          res.json(user);
        }
      }
    });
  },

  logout: (req, res) => {
    if (req.session.loginID) {
      req.session.loginID = null;
      res.json(req.session.loginID);
    }
  },

  userShow: (req, res) => {
    User.find({ _id: req.body.id })
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },

  // userUpdate: (req, res) => {
  //   console.log("got that edit request", req.body);
  //   User.find({ _id: req.params.id })
  //     .then(data => {
  //       if (!data.threads.includes(req.body.thread)) {
  //         User.updateOne(
  //           { _id: req.params.id },
  //           {
  //             $push: {
  //               threads: req.body.thread
  //             }
  //           }
  //         )
  //           .then(data => {
  //             res.json({ message: "Success!", data });
  //           })
  //           .catch(err => {
  //             console.log("Returned error", err);
  //             res.json({ message: "Error", error: err });
  //           });
  //       }
  //     })
  //     .catch(err => {
  //       res.json({ message: "Error", error: err });
  //     });
  // },

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

  threadIndex: (req, res) => {
    Thread.find({})
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },
  threadSearch: (req, res) => {
    Thread.find({ category: req.body.text })
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },

  threadAscending: (req, res) => {
    Thread.find({})
      .sort({ title: 1 })
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },
  threadDescending: (req, res) => {
    Thread.find({})
      .sort({ title: -1 })
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },
  threadAscendingTime: (req, res) => {
    Thread.find({})
      .sort({ timestamps: 1 })
      .then(data => {
        res.json({ message: "Success", data: data });
      })
      .catch(err => {
        res.json({ message: "Error", error: err });
      });
  },
  threadDescendingTime: (req, res) => {
    Thread.find({})
      .sort({ timestamps: -1 })
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
      category: req.body.category,
      content: req.body.content,
      imageURL: req.body.imageURL
    });
    thread
      .save()
      .then(item => {
        Thread.updateOne(
          { _id: item._id },
          {
            $push: {
              creator: req.body.creator
            }
          }
        )
          .then(data => {
            res.json({ message: "Success", data });
          })
          .catch(err => {
            console.log("Error!");
            res.json({ message: "Failed to create thread", error: err });
          });
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
        $push: {
          users: req.body
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
