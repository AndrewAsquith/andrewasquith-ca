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

const articleAuthor = function(author) {
    return `<meta property="article:author" content"${author}" />`;
}

const articlePublished = function(date) {
    return `<meta property="article:published_time" contents="${date}" />`;
}

const articleTags = function(...args) {
    let tags = Array();
    if (args.length === 1) {
        tags = String(args[0]).split(",");
    } else {
        tags = args;
    }
    let ret = String();
    tags.forEach(tag => {
        ret += `<meta property="article:tag" contents="${tag}" />`;
    });
    return ret;
}
 
module.exports = {
    required,
    description,
    sitename,
    articleAuthor,
    articlePublished,
    articleTags
};