const Sequelize = require("sequelize");
const db = require("../db");

const Doctor = db.define("doctor", {
  rating: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Doctor;
