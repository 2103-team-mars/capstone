const Sequelize = require('sequelize');
const db = require('../db');

const Medication = db.define('medication', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  company: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  strength: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  instructions: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  reason: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Medication;
