const { User } = require('./db');

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isPatient = (req, res, next) => {
  if (req.user.metaType === 'patient') {
    next();
  } else {
    const error = new Error('not authorized');
    error.status = 403;
    next(error);
  }
};

const isDoctor = (req, res, next) => {
  if (req.user.metaType === 'doctor') {
    next();
  } else {
    const error = new Error('not authorized');
    error.status = 403;
    next(error);
  }
};

module.exports = { isLoggedIn, isPatient, isDoctor };
