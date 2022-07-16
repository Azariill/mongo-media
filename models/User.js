const { Schema, model, Types  } = require('mongoose');

const UserSchema = new Schema(
    {
        username:{
            type: String,
            trim: true,
            require: 'Please enter a username',
            unique: true
        },
        email: {
            type: String,
            unique: true,
            require: 'Please enter an email address',
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'Please enter a valid e-mail address']
          },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought'
            }
          ],
        friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User'
            }
          ]
    },
    {
        toJSON:{
            virtuals: true
        },
        id:false
    }
);

UserSchema.virtual('friendCount').get(() =>{
    // returns how many friends the user has on query
    if(this.friends){
      return this.friends.length;
    }

    return;
   

});

const User = model('User', UserSchema);

module.exports = User;