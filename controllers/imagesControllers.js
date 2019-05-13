const imagesServices = require('../services/imagesService');

const save = async (req, res, next) => {
    try {
        const image = req.file;
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

        res.sendFile(imagePath);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    save,
    get
};