// const Sequelize = require('sequelize');
// const db = require('../db');

// const Patient = db.define('patient', {
//   age: {
//     type: Sequelize.INTEGER,
//     validate: {
//       min: 0,
//     },
//   },
//   sex: {
//     type: Sequelize.ENUM('male', 'female'),
//     allowNull: false,
//   },
//   dob: {
//     type: Sequelize.DATEONLY,
//     allowNull: false,
//     validate: {
//       isDate: true,
//     },
//   },
//   location: {
//     type: Sequelize.TEXT,
//     allowNull: false,
//   },
//   // symptoms: {
//   //   type: Sequelize.ARRAY(Sequelize.TEXT),
//   //   allowNull: false,
//   //   defaultValue: [],
//   // },
//   // diagnosis: { //Cant relate to doctors?
//   //   type: Sequelize.ARRAY(Sequelize.TEXT),
//   //   allowNull: false,
//   //   defaultValue: [],
//   // },
//   rating: {
//     type: Sequelize.INTEGER,
//   },
// });

// module.exports = Patient;
