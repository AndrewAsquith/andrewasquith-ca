const summaryCard = function (site, title, description, image,creator ) {
    let ret = '';
    if(image) {
        ret += `<meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${image}" />`;
    } else {
        ret += `<meta name="twitter:card" content="summary" />`;
    }
    ret += `
    <meta name="twitter:site" content="${site}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />`;
    if(creator) {
        ret += `    <meta name="twitter:creator" content="${creator}" />`;
    }

    return ret;
}

module.exports = {
    summaryCard
};