const router = require('express').Router();
const {User} = require('../../models');

// route to get all users
router.get('/' , (req,res) =>{
    User.find({})
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .populate({
        path: 'friends',
        select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
});
//get user by :id
router.get('/:id', ({params}, res) =>{
    User.findOne({_id: params.id})
    .populate({
        path: 'thoughts',
        select: '-__v'
      })
    .populate({
        path: 'friends',
        select: '-__v'
    })
      .select('-__v')
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
});
//create a new user
router.post('/' , ({body}, res) =>{
    User.create(body)
     .then(userData => res.json(userData))
     .catch(err => res.json(err));

});
//update user by :id
router.put('/:id' , ({params,body}, res) =>{
    User.findOneAndUpdate({_id: params.id}, body,{ new:true, runValidators: true})
        .then(userData =>{
            if(!userData){
                res.status(404).json({ message: 'No user was found with this id.'}); 
                return;
            }
            res.json(userData);
        })
        .catch(err => res.json(err));
});
// delete user
router.delete('/:id', ({params}, res)=>{
    User.findOneAndDelete({_id: params.id},{$pull:{thoughts}},{new:true})
        .then(userDelete =>{
            if(!userDelete){
                return res.status(404).json({ message: 'No user found with this id'});
            }
            res.json(`${userDelete.username} has been removed`);
        })
        .catch(err => res.json(err));      
})

module.exports = router;