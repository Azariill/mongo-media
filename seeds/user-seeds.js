
const { User } = require('../models');

const userData = [
  {
    username: 'jdoe',
    email: 'j_doe@gmail.com',
    friends:['62d2f9a4c938b23fb893d1f6','62d2fb710a4c8df900a258cd']
  },
  {
    username: 'jcool',
    email: 'j_cool@gmail.com',
    friends:['62d2f9a4c938b23fb893d1f6','62d2fb710a4c8df900a258cd']
 
  },
  {
    username: 'j_doe_123',
    email: 'j_doe_123@gmail.com',
    friends:['62d2f9a4c938b23fb893d1f6','62d2fb710a4c8df900a258cd']
  },
  {
    username: 'superman',
    email: 'super_man@gmail.com',
    friends:['62d2f9a4c938b23fb893d1f6','62d2fb710a4c8df900a258cd']

  },
  {
    username: 'batman',
    email: 'bat_man@gmail.com',
    friends:['62d2f9a4c938b23fb893d1f6','62d2fb710a4c8df900a258cd']
  }

];

const seedUsers = () => User.create(userData);

module.exports = seedUsers;
