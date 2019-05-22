const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const deleteFileAsync = promisify(fs.unlink);


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

    async remove(name) {
        console.log('name', name)
        try {
            await deleteFileAsync(path.join(__dirname, '../public/images/', name));
            return {isSuccessfully: true}
        }
        catch (err) {
            console.log('err', err);
            return {isSuccessfully: false}
        }
      
    }
}

module.exports = new ImageService();