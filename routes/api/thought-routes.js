const router = require("express").Router();
const { User, Thought } = require("../../models");

// route to get all thoughts
router.get("/", (req, res) => {
  Thought.find({})
    .select("-__v")
    .sort({ _id: -1 })
    .then((thoughtsData) => res.json(thoughtsData))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});
//get thoughts by :id
router.get("/:id", ({ params }, res) => {
  Thought.findOne({ _id: params.id })
    .select("-__v")
    .then((thoughtData) => res.json(thoughtData))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});
//create a new user
router.post("/", ({ body }, res) => {
  Thought.create(body)
    .then((thoughtData) =>{
        // check to see if username exists if so link thought to user
        User.find
    })
    .catch((err) => res.json(err));
});
//update user by :id
router.put("/:id", ({ params, body }, res) => {
  Thought.findOneAndUpdate({ _id: params.id }, body, {
    new: true,
    runValidators: true,
  })
    .then((thoughtData) => {
      if (!thoughtData) {
        res.status(404).json({ message: "No thought was found with this id." });
        return;
      }
      res.json(thoughtData);
    })
    .catch((err) => res.json(err));
});
// delete user
router.delete("/:id", ({ params }, res) => {
  User.findOneAndDelete({ _id: params.id }, { new: true })
    .then((thoughtDelete) => {
      if (!thoughtDelete) {
        return res.status(404).json({ message: "No thought found with this id" });
      }
      res.json(`${userDelete.username} has been removed`);
    })
    .catch((err) => res.json(err));
});
//add a friend
router.post("/:userId/friends/:friendId", ({ params, body }, res) => {
  User.find({ _id: params.friendId })
    .then((friendsData) => {
      if (!friendsData) {
        res
          .status(404)
          .json({ message: "The friend you are trying to add doesn't exist" });
        return;
      }
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
      )
        .then((userData) => {
          if (!userData) {
            res
              .status(404)
              .json({
                message: "The user you are trying to update doesn't exists",
              });
            return;
          }
          res.json(userData);
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

module.exports = router;
