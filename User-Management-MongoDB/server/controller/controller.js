var Userdb = require('../model/model');

  //create and save new user
exports.create = (req, res) => {
  //validate user
  if (!req.body) {
    res.status(400).send({
      message: "Please fill up the necessary information"
    })
    return;
  }

  // new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
  });
  //save data
  user
    .save(user)
    .then(data => {
      // res.send(data);
      res.redirect('/');
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "There's an error while creating a new users."
      })
    })
}
  //retrive one/all users
exports.find = (req, res) => {
  //find by query
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Data not found with id no ${id}`
          })
        } else {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `There an error while finding data with specified id no. ${id}`
        })
      })

  } else {
    //find all
    Userdb.find()
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "There's an error while retrieving a user/s"
        })
      })
  }
}

//update identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data must not be empty"
    })
  }

  const id = req.params.id; //url parameters
  Userdb.findByIdAndUpdate(id, req.body, {
      userFindAndModify: false
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${id}. User doesn't exists.`
        })
      } else {
        res.send(data)
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error update user information"
      })

    })
}

//delete user by specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(400).send({
          message: `Cannot delete with id ${id}. Please check the ID`
        })
      } else {
        res.send({
          message: "User deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `User with id of ${id} couldn't deleted. Please check the user ID`
      });
    })



}