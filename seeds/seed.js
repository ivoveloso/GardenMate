const sequelize = require('../config/connection');
const { User, Activity, Client } = require('../models');

const userData = require('./userData.json');
const activityData = require('./activityData.json');
const clientData = require('./clientData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const client of clientData) {
    await Client.create(client);
  }

  for (const activity of activityData) {
    await Activity.create(activity);
  }

  process.exit(0);
};

seedDatabase();
