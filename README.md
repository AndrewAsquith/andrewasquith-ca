# Personal Blog of Andrew Asquith at [AndrewAsquith.ca](https://www.andrewasquith.ca)

Powered by [11ty](https://11ty.io) and leveraging [Gulp](https://gulpjs.com)

## Setup

Clone the repository and run npm install to install 11ty, gulp and dependencies
> npm install


### Build Configuration

Setup .env - see [.env.sample](.env.sample) for an example

VERSION - needs to be set as it's used for lazy cache busting by renaming the css and js on build

ELEVENTY_ENV 
 - if set to "production" will include google analytics if configured and optionally minify the output 
 - any other value is treated as development, files are not minified and sourcemaps are created

ELEVENTY_MINIFY - if set to true and ELEVENTY_ENV = "production" the html, css and js are all minified


## Running

To build and then run:
> gulp run

To build the site:
> gulp build 


### Gulp Tasks
Run just the eleventy build process]:
> Generate/GenerateSync

Run the image pipeline which runs gulp-responsive for jpgs and pngs]:
> images

Compiles the Sass into a single CSS file:
> styles

Compiles the javascript into a single js file:
> scripts

Deletes the dist folder and it's contents:
> clean

Starts Browsersync on the dist folder
> serve

but you should probably just be calling gulp run to ensure the content is present


## Notable things

There's a whole bunch of Meta/SEO related shortcodes for:
 - basic HTML meta
 - jsonld markup for blogs and pages
 - opengraph markup for blogs and pages
 - twitter cards

See [meta.njk](src/site/_includes/components/meta.njk) for example usage.


Images in markdown are created with srcset through the @gerhobbelt/markdown-it-responsive plugin.
 - At the moment, setting the sizes is a manual process. Dimensions would need to be changed in the css breakpoints, the markdown-it-responsive config and the gulp-responsive config so that they're all in alignment. 


There's a privacy-policy included, which will include a section relating to google analytics if it's configured.


There's a .htaccess file incluced which will setup the 404 error page, but it also contains redirects for my previous wordpress powered blog, so you probably want to remove those.