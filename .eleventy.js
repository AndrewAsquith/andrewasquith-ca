
require('dotenv').config();
const  env = process.env.ELEVENTY_ENV;


module.exports = function(config) {

    //layout aliases
    config.addLayoutAlias('base', 'layouts/base.njk')

    //filters
    config.addFilter('friendlydate', require('./_11ty/filters/friendly-date.js'));
    config.addFilter('isoDate', require('./_11ty/filters/iso-date.js'));

    //Minify HTML (when ELEVENTY_ENV is production)
    config.addTransform('htmlmin', require('./_11ty/transforms/html-minify.js'));

    // Base Config
    return {
        dir: {
            input: 'src/site',
            output: 'dist'
        },
        templateFormats: ['njk', 'md'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        passthroughFileCopy: true
    }
}