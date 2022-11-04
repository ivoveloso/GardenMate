const sequelize = require('../config/connection');
const { User, Activity, Client} = require('../models');

const userData = require('./userData.json');
const activityData = require('./activityData.json');
const clientData = require('./clientData.json');

const seedDatabase = async () => {

  await sequelize.sync({ force: true });
  
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const activity of activityData) {
    await Activity.create({
      ...Activity
    });
  }

  for (const client of clientData) {
    await Client.create({
      ...Client
    });
  }

  process.exit(0);
};

seedDatabase();
