const express = require('express');
const filmControllers = require('../controllers/filmControllers');
//const auth = require('../middlewares/passportMiddleware');
const passport =  require('passport');
const checkRole = require('../middlewares/checkRoleMiddleware');
const { ROLES } = require('../config/ROLES');

const router = express.Router();
router.get('/films', 
  passport.authenticate('jwt', { session: false }), 
  checkRole.allowToRoles([ROLES.USER, ROLES.ADMIN]),
  filmControllers.getAllFilms
);
router.get('/films/:id', filmControllers.getFilm);
router.post(
  '/films', 
  passport.authenticate('jwt', { session: false }),
  checkRole.allowToRoles([ROLES.ADMIN]),
  filmControllers.createFilm
);
router.put(
  '/films/:id', 
  passport.authenticate('jwt', { session: false }),
  checkRole.allowToRoles([ROLES.ADMIN]),
  filmControllers.updateFilm
);
router.delete(
  '/films/:id', 
  passport.authenticate('jwt', { session: false }),
  checkRole.allowToRoles([ROLES.ADMIN]),
  filmControllers.deleteFilm
);

module.exports = router;