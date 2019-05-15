module.exports = (io) => {
  const express = require('express');
  const filmControllers = require('../controllers/filmControllers');
  //const auth = require('../middlewares/passportMiddleware');
  const passport =  require('passport');
  const checkRole = require('../middlewares/checkRoleMiddleware');
  const { ROLES } = require('../config/ROLES');
  const Film = require('../models/filmModel');

  const router = express.Router();

  router.post(
    '/films', 
    passport.authenticate('jwt', { session: false }),
    checkRole.allowToRoles([ROLES.ADMIN]),
    (req, res) => {
      console.log('req', req);
      let film = {};
      film.film_info = {
        filmName: req.body.name,
        description: req.body.description,
        poster_path: req.body.imagePath
      }
      Film.create(film, function (err, result) {
        if (!err) {
          io.emit('film created');
          res.json({result, isSuccessfully: true});
          return;
        } else {
          console.log(err);
          res.status(500).send(err)
        } 
      });
    }
  );
/*   router.put(
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
  ); */
    return router
}
//module.exports = router;