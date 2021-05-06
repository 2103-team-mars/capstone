const Sequelize = require('sequelize');
const db = require('../db');

const Appointment = db.define('appointment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  topic: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Appointment;
