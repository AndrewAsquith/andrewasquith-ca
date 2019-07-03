path = require('path');
module.exports = function (imageFile) {
    let imageExt = path.extname(imageFile);
    let imageBase = path.basename(imageFile,imageExt);
    let imageFolder = path.dirname(imageFile);

    let srcSet = imageFolder + '/' + imageBase + '-small' + imageExt + ' 480w, '
        + imageFolder + '/' + imageBase + '-medium' + imageExt + ' 960w, ' 
        + imageFolder + '/' + imageBase + '-large' + imageExt + ' 1440w, '
        + imageFile + ' 1920w';

    return srcSet;
};