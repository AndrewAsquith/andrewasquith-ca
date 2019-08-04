module.exports = function(collection) {

    const featuredFilter = p => p.data.isFeatured;
    return collection.getFilteredByGlob('**/posts/*.md')
    .filter(featuredFilter);
    
};