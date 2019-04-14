
require('dotenv').config();
const  env = process.env.ELEVENTY_ENV;
const pluginRss = require("@11ty/eleventy-plugin-rss");

const htmlMetaCodes = require('./_11ty/shortcodes/htmlMeta');
const openGraphCodes = require('./_11ty/shortcodes/opengraph');
const twitterCardCodes = require('./_11ty/shortcodes/twitterCard');

module.exports = function(config) {

    //layout aliases
    config.addLayoutAlias('base', 'layouts/base.njk')
    config.addLayoutAlias('page', 'layouts/page.njk')
    config.addLayoutAlias('post', 'layouts/post.njk')

    //filters
    config.addFilter('friendlyDate', require('./_11ty/filters/friendly-date.js'));
    config.addFilter('isoDate', require('./_11ty/filters/iso-date.js'));
    config.addFilter('imageUrl', require('./_11ty/filters/image-url.js'));

    //Minify HTML (when ELEVENTY_ENV is production)
    config.addTransform('htmlmin', require('./_11ty/transforms/html-minify.js'));

    //eleventy-plugin-rss
    config.addPlugin(pluginRss);

    //shortcodes
    config.addShortcode('canonical', htmlMetaCodes.canonical);
    config.addShortcode('metaDescription', htmlMetaCodes.metaDescription);
    config.addShortcode('metaTitle', htmlMetaCodes.metaTitle);
    config.addShortcode('twitterSummaryCard', twitterCardCodes.summaryCard);
    config.addShortcode('opengraphRequired', openGraphCodes.required);
    config.addShortcode('opengraphDescription', openGraphCodes.description);
    config.addShortcode('opengraphSite', openGraphCodes.sitename);

    //custom collections
    config.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("**/posts/*.md");
      });
      
    config.addCollection("tagList", require("./_11ty/helpers/getTagList.js"));


    //pass through files
    //config.addPassthroughCopy('./src/site/robots.txt');


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