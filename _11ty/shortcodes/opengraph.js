const required = function(title, type, url, image) {
    return `
    <meta property="og:title" content="${title}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    `;
}

const description = function(description) {
    return `<meta property="og:description" contents="${description}" />`;
}

const sitename = function(sitename) {
    return `<meta property="og:site_name" contents="${sitename}" />`;
}
 
module.exports = {
    required,
    description,
    sitename
};