const canonical = function(url) {
    return `<link rel="canonical" href="${url}" />`;
};

const metaTitle = function(title) {
    return `<title>${title}</title>`;
};

const metaDescription = function(description) {
    return `<meta name="description" content="${description}" />`;
};

const metaAuthor = function(authorUrl) {
    return `<link rel="author" href="${authorUrl}" />`;
}


module.exports = {
    canonical,
    metaTitle,
    metaDescription,
    metaAuthor
};