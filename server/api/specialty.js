const router = require("express").Router();
const { Specialty } = require("../db");
const { isDoctor, isLoggedIn, getSpecialtyIds } = require("../middleware");
module.exports = router;

//PUT /api/specialty
router.put(
  "/",
  isLoggedIn,
  isDoctor,
  getSpecialtyIds,
  async (req, res, next) => {
    try {
      //fetch doctor Instance
      const userInstance = req.user;
      const docInstance = await userInstance.getDoctor();

      //covert array of strings (req.body) to array of ids (arrOfIds). Then set to doc instance

      await docInstance.setSpecialties(req.data);

      //fetch each update specialty and send back
      const updatedSpecialties = await docInstance.getSpecialties();
      res.send(updatedSpecialties);
    } catch (err) {
      next(err);
    }
  }
);
