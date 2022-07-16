const mongoose = require('mongoose');
const seedUsers = require('./user-seeds');


const seedAll = async () => {
    // connect to database
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/pizza-hunt', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
  console.log('\n----- DATABASE SYNCED -----\n');
  // Seed users
  await seedUsers();
  console.log('\n----- Users SEEDED -----\n');

  process.exit(0);
};

seedAll();
