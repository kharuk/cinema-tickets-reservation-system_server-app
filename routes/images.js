const express = require('express');
const imagesControllers = require('../controllers/imagesControllers');
const passport =  require('passport');
const multer = require('multer');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
      destination: (req, file, callback) => {
          let path = 'public/images';
          callback(null, path);
      },
      filename: (req, file, callback) => {
          callback(null, `${Date.now()}.${file.originalname.split('.').pop()}`);
      }
  })
}); 

router.get('/images/:name', imagesControllers.get);
router.post('/images', upload.single('FilmPoster'), imagesControllers.save);

module.exports = router;