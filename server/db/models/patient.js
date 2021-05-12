const Sequelize = require('sequelize');
const db = require('../db');

const Patient = db.define('patient', {});

module.exports = Patient;
