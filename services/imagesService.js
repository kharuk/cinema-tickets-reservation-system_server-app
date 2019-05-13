const path = require('path');

class ImageService {
    constructor() {}

    save(image) {
        const imagePaths = {src: `http://localhost:8080/api/images/${image.filename}`};
        return imagePaths;
    }

    get(name) {
        const photoPath = path.join(__dirname, '../public/images/', name);
        console.log(photoPath);
        return photoPath;
    }

    delete() {}
}

module.exports = new ImageService();