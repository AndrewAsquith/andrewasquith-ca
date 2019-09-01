---
title: From WordPress to Eleventy
description: My experience switching this blog from WordPress to Eleventy
permalink: /posts/from-wordpress-to-eleventy/
image: /img/posts/from-wordpress-to-eleventy/wordpress-eleventy-logos.jpg
date: 2019-08-04
isFeatured: true
tags: 
 - performance
 - wordpress
 - eleventy
---

I recently switched this blog [WordPress](https://wordpress.org "WordPress") to [Eleventy](https://11ty.io "Eleventy") and wanted to go over a few of the differences.

## The Why

I don't do development of any kind full time, and I like it that way. However, I do like to keep up on modern technologies and trends, and it was about time that I actually did something with this site. I'd drafted a number of posts over the years, but never got around to finalizing and publishing them, so I set myself a goal to both experiment with something new and get those posts out the door at the same time.

WordPress has long been the defacto blogging platform for most people. There are some fairly popular competitors such as [Drupal](https://www.drupal.org "Drupal"), but it's still the most well known and widely used, and I even I still run it elsewhere. Recent years have seen the rise of hosted services to get you publishing faster and without the need to administer your own server. Personally, I like administering my own server, so one of my requirements was that it continue to be self-hosted. I'd also already run Drupal for many years, and wanted to try something completely new. 

## The How

In perusing twitter I came across the "JAM stack" concept, which is **J**avascript, **A**PIs and **M**arkup and the recent (as in the last couple of years) proliferation of "Static Site Generators" that complement this idea. After looking at the popular ones including [Jekyll](https://jekyllrb.com/ "Jekyll"), [Hugo](https://gohugo.io/ "Hugo") and [Gatsby](https://www.gatsbyjs.org/ "Gatsby") I saw a tweet mentioning [Eleventy](https://11ty.io "Eleventy") which billed itself as a "simpler static site generator". This piqued my interest, and I grabbed an updated copy of NodeJS and got to work figuring out what was going on.

Despite Eleventy being a fairly "young" project the documentation was pretty thorough, there was a sample project for getting a blog up and running and there was already a budding community of people using it. Unlike most of it's competitors, out of the box, Eleventy supports a wide variety of templating engines, meaning I was able to pick something I was moderately familiar with for templating and just use good old markdown for my post content.

I quickly replaced some of my simple one-page placeholder sites with ones built with Eleventy and decided it would a decent fit for this blog as well. 

### Tooling

Eleventy itself is pure javascript, which, while I'm not an expert by any means, I felt proficient enough to at least get by, and certainly there's enough literature out there to teach me anything I don't know. I was already familiar with [Gulp](https://gulpjs.org "Gulp") so I decided to incorporate that into my workflow as I had a few requirements Eleventy itself did not meet. I primarily make my living on Windows and wanted something that worked natively all the time, which both pure NPM and many of the other solutions still struggle with.

Because Eleventy is a fairly new project, it doesn't have the years worth of development of plugins and helpers that WordPress or even the other, older, static site generators had available, however my needs were fairly meager.  Getting Eleventy itself running was dead simple. During my development of this site I was even able to submit a pull request to fix a bug when running on Windows, which is a testament to how easy it was to go through the code base.

The most time consuming aspect of my rebuild was trying to get all the SEO related metadata in place. Accomplishing that is a simple plugin install under WordPress, but it's not something that Eleventy or it's plugin ecosystem currently possess. To that end, I ended up creating a number of [shortcodes](https://github.com/AndrewAsquith/andrewasquith-ca/tree/master/_11ty/shortcodes "Eleventy Shortcodes on GitHub") for Eleventy that I'm able to mix and match in my templates to get my desired outcome.  

On the whole, anything based on node is accessible to you as a developer, and anything that node lacks or doesn't fit your need can obviously done yourself in javascript. Coupling Eleventy with Gulp, which is also node based meant that I was able to find solutions for compiling SASS, minifying output and bundling without having to look too hard. 


## The Results

My workflow still leaves a little bit to be desired. My images are converted to multiple different sizes by a gulp task, and I added a markdown plugin that adds the srcset attribute to any images I include in posts. My main pain point is that their configurations are both distinct and ultimately depend on breakpoints I'm setting in the CSS. Finding some way to amalgamate those configurations would both simplify my image workflow and make it more portable to other projects.

Being able to have gulp watch my folders for changes and act appropriately while using BrowserSync to reload on the fly makes the overall development experience on Windows a step above what I was doing with WordPress (more on that in another post).

### Publishing

One of the reasons WordPress is so popular, aside from the plugins that you can find to do just about anything is the easy to use editor that makes publising your content trivial. 

There are several editor options that you can utilize with Eleventy (or other static site generators) and services that specialize in hosting your static site such as [Netlify](https://www.netlify.com "Netlify") have developed their own, however most of them proved to be more work than I was willing to put into things. 

Writing in Markdown is trivial and allows me to "just write" so I stuck with [Visual Studio Code](https://code.visualstudio.com/ "Visual Studio Code") as my editor of choice. Zen Mode (Ctrl K, Z) removes all the extra toolbars and panels and allows me to write in peace. Picking a spell checking plugin for Visual Studio Code is left as an exercise for the reader, as that was a noticeable gap as soon as I started writing content.

### PageSpeed

Being a tech minded individual, I know performance is important, and was curious as to how my two iterations compared to each other. Before retiring my old site, I ran Google's [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/ "PageSpeed Insights") against it. 


![WordPress PageSpeed Results](/img/posts/from-wordpress-to-eleventy/wordpress-pagespeed-results.jpg "WordPress PageSpeed Results")


My WordPress instance was fairly well optimized, I ran a personal theme that stripped out cruft I didn't want or need, and utilized a caching plugin to minify assets and essentially convert my WordPress site to one that was statically generated. It scored a very respectable 98 for the desktop version and 94 for the mobile version. 


![Eleventy PageSpeed Results](/img/posts/from-wordpress-to-eleventy/eleventy-pagespeed-results.jpg "Eleventy PageSpeed Results")


My Eleventy site is as optimized as I could make it as well, applying all the same techniques I did under WordPress such as minifying, using responsive images and leveraging appropriate cache control. The site now scores 100 for the desktop version and 98 for the mobile version. 

If you look at the results closely, you'll see that not only are the big green numbers better, but the smaller, arguably more important numbers, regarding the timing to specific events are about half under the new version compared to what they were under WordPress.

The new iteration doesn't use any client side script (except for Google Analytics) so I was able to eliminate two requests there. The css is minified into a single much smaller file, cutting the number of requests in half and substantially reducing the size. I also stuck with the browser's default fonts, so I was able to eliminate several more requests the browser had to make to render the page.  For a post with no images the total requests (ignoring Google Analytics) were reduced from 12 to 5 and the total content from just over 1 megabyte to less than 600 kilobytes, which like the timing entries, was an almost 50% reduction for the better. 

## Final Thought

Eleventy and it's static site generating kin are definitely not going to be for everyone. WordPress and other CMS solutions will continue to hold the majority of the market share when it comes to publishing platforms, mostly because people don't care what's underneath, as long as they can put their content out easily.

I on the other hand, love tinkering, love the absolute control I have over what's rendered, and am quite comfortable with the command line, so at least for now, I'm sticking with it. I appear to be in good company as well, as several notable sites are leveraging Eleventy such including Google's [web.dev](https://web.dev/ "Web.dev") and CERN's [WorldWideWeb Rebuild](https://worldwideweb.cern.ch/ "CERN's WorldWideWeb Rebuild").