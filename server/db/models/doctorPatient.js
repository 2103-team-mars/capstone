const Sequelize = require('sequelize');
const db = require('../db');

const DoctorPatient = db.define('doctorPatient', {
  diagnosis: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  notes: {
    type: Sequelize.TEXT,
  },
});

module.exports = DoctorPatient;
