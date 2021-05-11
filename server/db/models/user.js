const Sequelize = require('sequelize');
const db = require('../db');
const Patient = require('./patient');
const Doctor = require('./doctor');
const { Profession } = require('./metaTables');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const makeCoordinates = require('../../coordinates');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profilePicture: {
    type: Sequelize.TEXT,
    defaultValue: 'https://rpgplanner.com/wp-content/uploads/2020/06/no-photo-available.png',
  },
  age: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  sex: {
    type: Sequelize.ENUM('male', 'female'),
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  location: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  coordinates: {
    type: Sequelize.ARRAY(Sequelize.FLOAT),
  },
  metaType: {
    type: Sequelize.ENUM('doctor', 'patient'),
    allowNull: false,
  },
  metaId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = User;

/**
 * instanceMethods
 */

User.addHook('afterFind', (findResult) => {
  if (!Array.isArray(findResult)) findResult = [findResult];
  for (const instance of findResult) {
    if (instance.metaType === 'doctor' && instance.doctor !== undefined) {
      instance.meta = instance.doctor;
      instance.dataValues.meta = instance.doctor;
    } else if (instance.metaType === 'patient' && instance.patient !== undefined) {
      instance.meta = instance.patient;
      instance.dataValues.meta = instance.patient;
    }
    // To prevent mistakes:
    delete instance.doctor;
    delete instance.dataValues.doctor;
    delete instance.patient;
    delete instance.dataValues.patient;
  }
});

User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect email/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id, { include: [Patient, { model: Doctor, include: Profession }] });
    if (!user) {
      throw 'nooo';
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  // console.log(user.changed());
  // console.log(user.changed('password'));
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

const convertAddress = async (user) => {
  if (user.changed('location')) {
    console.log('in convertAddress');
    user.coordinates = await makeCoordinates(user.location);
  }
};

User.beforeCreate(hashPassword);
User.beforeCreate(convertAddress);
User.beforeUpdate(convertAddress);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => {
  return Promise.all(users.map(hashPassword));
});
User.beforeBulkCreate((users) => {
  return Promise.all(users.map(convertAddress));
});
