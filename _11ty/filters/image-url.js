// create a path to images embedded in posts, easy to change strategy
module.exports = function (imageFile, pageObj) {
    const prefix = '/img'
    slug = pageObj.url;
    if (slug) {
        return prefix + slug + imageFile;
    }
    return prefix + '/' +  imageFile;
};