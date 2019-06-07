const imagesServices = require('../services/imagesService');

const save = async (req, res, next) => {
    try {
        const image = req.file;
        console.log(image)
        const imagePath = imagesServices.save(image);
        console.log('imagePath', imagePath);
        res.send({ imagePath }); 
    } catch (err) {
        next(err);
    }
};

const get = (req, res, next) => {
    try {
        const imageName = req.params.name;
        const imagePath = imagesServices.get(imageName);
      //  console.log(imagePath);
        res.sendFile(imagePath);
    } catch (err) {
        console.log('err',err);
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const imageName = req.params.name;
        const imagePath = await imagesServices.remove(imageName);
        console.log('imagePath', imagePath);
        res.send(imagePath);
    } catch (err) {
        console.log('err',err);
        next(err);
    }
};

module.exports = {
    save,
    get,
    remove
};