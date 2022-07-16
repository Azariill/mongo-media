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
//create a new thought
router.post("/", ({ body }, res) => {
  Thought.create(body)
    .then((thoughtData) =>{
        console.log(`this is ${thoughtData}`)
        // check to see if username exists if so link thought to user
        User.findOne({username: thoughtData.username})
        .then(userData => {
            if(!userData){
                res.status(404).json({ message: `No user by the name of ${userData.username} exists please try again case sensitive`})
                return;
            }
            // update user to accept the new thought
            return User.findOneAndUpdate({_id: userData._id},{$push:{thoughts:thoughtData}},{new:true}).then(updateData => res.json(updateData)).catch(err => res.json(err));

        }).catch(err => res.json(err));
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
  Thought.findOneAndDelete({ _id: params.id }, { new: true })
    .then((thoughtDelete) => {
      if (!thoughtDelete) {
        return res.status(404).json({ message: "No thought found with this id" });
      }
      res.json(`${thoughtDelete.thoughtText} has been removed`);
    })
    .catch((err) => res.json(err));
});
//post a reaction to a thought
router.post("/:thoughtId/reactions", ({ params, body }, res) => {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId},
    { $push: {reactions: body}},
    {new: true, runValidators: true}
    )
    .then((thoughtsData) => {
      if (!thoughtsData) {
        res
          .status(404)
          .json({ message: "The thought that you are trying to react to doesn't exist" });
        return;
      }
      res.json(thoughtsData);
    })
    .catch((err) => res.json(err));
});
// delete route for a reaction
router.delete("/:thoughtId/reactions/:reactionId", ({params}, res) =>{
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        { $pull: { reactions:{reactionId : params.reactionId}} },
        { new: true }
    )
        .then(reactionData => res.json(reactionData))
        .catch(err => res.json(err));
});

module.exports = router;
