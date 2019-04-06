require('dotenv').config();
const  env = process.env.ELEVENTY_ENV;

const htmlmin = require('html-minifier');

    // Minify HTML Output
    module.exports = function(content, outputPath) {
        if (env === 'production' && outputPath.endsWith('.html')) {
            return htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                processScripts: "application/ld+json"
            })
        }
        return content
    }
    