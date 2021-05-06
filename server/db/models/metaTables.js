const Sequelize = require('sequelize');
const db = require('../db');

const Symptom = db.define('symptom', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

const Specialty = db.define('specialty', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

const Profession = db.define('profession', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = { Symptom, Specialty, Profession };
