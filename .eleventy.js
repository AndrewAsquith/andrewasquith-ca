
require('dotenv').config();
const  env = process.env.ELEVENTY_ENV;
const pluginRss = require("@11ty/eleventy-plugin-rss");

const htmlMetaCodes = require('./_11ty/shortcodes/htmlMeta');
const openGraphCodes = require('./_11ty/shortcodes/opengraph');
const twitterCardCodes = require('./_11ty/shortcodes/twitterCard');
const jsonldCodes = require('./_11ty/shortcodes/jsonld');
module.exports = function(config) {

    //layout aliases
    config.addLayoutAlias('base', 'layouts/base.njk')
    config.addLayoutAlias('page', 'layouts/page.njk')
    config.addLayoutAlias('post', 'layouts/post.njk')

    //filters
    config.addFilter('friendlyDate', require('./_11ty/filters/friendly-date.js'));
    config.addFilter('isoDate', require('./_11ty/filters/iso-date.js'));
    config.addFilter('head', require('./_11ty/filters/head.js'));
    config.addFilter('srcset', require('./_11ty/filters/image-srcset'));
    //config.addFilter('imageUrl', require('./_11ty/filters/image-url.js'));

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
    config.addShortcode('opengraphArticleAuthor', openGraphCodes.articleAuthor);
    config.addShortcode('opengraphArticlePublished', openGraphCodes.articlePublished);
    config.addShortcode('opengraphArticleTags', openGraphCodes.articleTags);
    config.addPairedShortcode('jsonldWrapper', jsonldCodes.wrapper);
    config.addPairedShortcode('jsonldAuthor',jsonldCodes.author);
    config.addPairedShortcode('jsonldOrganization',jsonldCodes.organization);
    config.addShortcode('jsonldDescription', jsonldCodes.description);
    config.addShortcode('jsonldSameAs', jsonldCodes.sameAs);
    config.addShortcode('jsonldMainEntity', jsonldCodes.mainEntity);
    config.addShortcode('jsonldHeadline', jsonldCodes.headline);
    config.addPairedShortcode('jsonldArticle', jsonldCodes.article);
    config.addPairedShortcode('jsonldBlogPosting', jsonldCodes.blogposting);
    config.addShortcode('jsonldImage', jsonldCodes.image);
    config.addShortcode('jsonldUrl', jsonldCodes.url);
    config.addPairedShortcode('jsonldPropertyWrapper', jsonldCodes.propertyWrapper);
    config.addShortcode('jsonldId', jsonldCodes.id);
    config.addShortcode('jsonldType', jsonldCodes.type);
    config.addShortcode('jsonldName', jsonldCodes.name);
    config.addShortcode('jsonldDatePublished', jsonldCodes.datepublished);
    config.addShortcode('jsonldProperty', jsonldCodes.kvp);
    config.addPairedShortcode('jsonldBreadcrumblist', jsonldCodes.breadcrumblist);
    config.addShortcode('jsonldBreadcrumbitem', jsonldCodes.breadcrumbitem);

    //custom collections
    config.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("**/posts/*.md");
      });
      
    config.addCollection("tagList", require("./_11ty/helpers/getTagList.js"));


    //pass through files
    //config.addPassthroughCopy('./src/site/robots.txt');

    //markdown-it customization
    var responsiveOptions = { responsive: {
        'srcset': {
          '*': [ {
            width: 480,
            rename: {
              suffix: '-small'
            }
          }, {
            width: 960,
            rename: {
              suffix: '-medium'
            }
          }, {
            width: 1440,
            rename: {
              suffix: '-large'
            }
          }, {
            width: 1920
          }
         ]
        }, 'sizes': {

            '*': '90vw'
      
          }
      }
    };
    let markdownIt = require("markdown-it")({
        html: true
    }).use(require('@gerhobbelt/markdown-it-responsive'), responsiveOptions);
    
    config.setLibrary("md", markdownIt);

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