const User = require('./User');
const Activity = require('./Activity');
const Client = require('./Client');

User.hasMany(Activity, {
  foreignKey: 'user_id',
});

Activity.belongsTo(User, {
  foreignKey: 'user_id',
});

Client.hasMany(Activity, {
  foreignKey: 'client_id',
});

Activity.belongsTo(Client, {
  foreignKey: 'client_id',
});

module.exports = {User, Activity, Client};
