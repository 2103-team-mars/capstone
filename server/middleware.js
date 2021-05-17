const { User, Specialty } = require("./db");

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
  if (req.user.metaType === "patient") {
    next();
  } else {
    const error = new Error("not authorized");
    error.status = 403;
    next(error);
  }
};

const isDoctor = (req, res, next) => {
  if (req.user.metaType === "doctor") {
    next();
  } else {
    const error = new Error("not authorized");
    error.status = 403;
    next(error);
  }
};

//converts specialty string to array of ids as req.data
const getSpecialtyIds = async (req, res, next) => {
  try {
    const SpecialtyIdArr = await Specialty.findAll({
      where: {
        name: req.body,
      },
    });

    req.data = SpecialtyIdArr;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isLoggedIn, isPatient, isDoctor, getSpecialtyIds };
