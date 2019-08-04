---
title: "Performance Comparison: WP Super Cache and W3 Total Cache"
description: A look at the gains to be had from using WP Super Cache and W3 Total Cache on WordPress
date: 2011-09-01
permalink: /posts/performance-comparison-wp-supercache-and-w3-total-cache/
tags: 
 - caching
 - performance
 - technology
 - wordpress
---

## The Setup

I wanted a relevant performance comparison of the two most popular (at the time) caching solutions for [WordPress](http://wordpress.org/ "WordPress") before I chose one for this blog.

In my opinion, there are two key issues to getting relevant performance comparisons and benchmarks.

The first is the hardware and software involved. Different versions can have huge differences in performance profiles so you want test with as close a match as you can get.

I was not able to match the hardware my live server uses, so I was inclined to make sure the software was as closely matched as humanly possible.

I installed [Ubuntu Server 8.04](http://ubuntu.com "Ubuntu") and the latest [PHP](http://php.net "PHP") (5.2.4-2ubuntu5.17) into my virtual machine and brought it all up to date. I then configured [Apache](http://projects.apache.org/projects/http_server.html "Apache HTTP Server") (Apache/2.2.8 for the curious) to match the configuration of my blog's server (which modules were loaded, php via fastcgi, [APC](http://php.net/manual/en/book.apc.php "APC") installed, the php.ini values etc). The same was done for the [MySQL](http://www.mysql.com "MySQL") instance.

After confirming everything was working I installed the latest [WordPress](http://wordpress.org/ "WordPress") release (at the time version 3.1.3) and the [importer plugin](http://wordpress.org/extend/plugins/wordpress-importer/ "WordPress Importer") and imported the [WordPress sample data](http://svn.automattic.com/wpcom-themes/test-data.2008-12-22.xml "WordPress Test Data").  I then shut down the virtual machine and enabled the "undo disk" feature.

This brings me to the second issue when looking at performance, which is repeatability. Test results are skewed by changes to the environment (e.g. extra processes running, or extra network traffic) so it's important to (preferably) eliminate or baseline those external factors.

The "undo disk" feature proved very helpful in my efforts to minimize the influence of those external factors.

## The Methodology

As these tests were being run in a virtual machine I couldn't expect similar numbers as my live site. However, as I'm looking to compare the two solutions, relative performance to one another is all that's really important.  I decided to run apachebench from within the virtual machine to eliminate a lot of issues that would be out of my control (communication between the host machine and  the virtual machine, the  host using additional cpu time, etc).

This was not ideal as I'm stealing potential resources from the apache instance, but compared to the alternatives it was the best option. After running a few tests and looking at the numbers I decided on 3 runs of 1000 requests each at both a concurrency of 1 and a concurrency of 5. The concurrency level of 5 was enough to generate some contention for resources but not enough to bog down the virtual machine.

The command line looked something like this
> ab -n 1000 -c 5 http://localhost

After each run of tests I shut down the virtual machine and cleared the undo disks to restore the machine's baseline state.

After each boot the virtual machine was given an equal amount of time to "settle down" before the tests were run.

## The Results

For each of the results I calculated averages of the 3 "c1" and 3 "c5" runs as well as an overall average across all 6 tests.  The values in the rows are requests per second.

To get an idea of what the virtual machine was capable of doing, my initial tests were against a static html file (the "it works" index file). The results are as follows

<table class="data-table">
<tbody>
<tr>
<th colspan="3" class="data-table__header data-table__cell">Static File</th>
</tr>
<tr>
<th class="data-table__cell data-table__header">C=1</th>
<th class="data-table__cell data-table__header">C=5</th>
<th class="data-table__cell data-table__header">Overall</th>
</tr>
<tr>
<td class="data-table__cell">1082.84</td>
<td class="data-table__cell">1125.60</td>
<td class="data-table__cell">1104.22</td>
</tr>
</tbody>
</table>

The next test was to determine how well it fared with php involved. I chose the "phpinfo" page as my test subject.

<table class="data-table">
<tbody>
<tr>
<th colspan="3" class="data-table__cell data-table__header">PHPInfo</th>
</tr>
<tr>
<th class="data-table__cell data-table__header">C=1</th>
<th class="data-table__cell data-table__header">C=5</th>
<th class="data-table__cell data-table__header">Overall</th>
</tr>
<tr>
<td class="data-table__cell">226.61</td>
<td class="data-table__cell">203.78</td>
<td class="data-table__cell">215.20</td>
</tr>										
</tbody>
</table>

With a server baseline in hand, it was on to WordPress.

For the [WordPress](http://wordpress.org/ "WordPress") tests I opted to test a few different code paths. I tested the following scenarios:

- Front page: http://localhost/
- Hello World: http://localhost/2011/06/hello-world/
- Archive Page: http://localhost/2008/06/
- Category Page: http://localhost/category/uncategorized/
- Tags Page: http://localhost/tag/post-formats/

With only itself to rely on, the WordPress results are not pretty.

<table class="data-table">
<tbody>
<tr>
<th colspan="3" class="data-table__cell data-table__header">WordPress</th>
</tr>
<tr>
  <th class="data-table__cell data-table__header">C=1</th>
  <th class="data-table__cell data-table__header">C=5</th>
  <th class="data-table__cell data-table__header">Overall</th>
</tr>
<tr>
  <th colspan="3" class="data-table__cell data-table__subheader">Frontpage</th>
</tr>
<tr>
  <td class="data-table__cell">6.72</td>
  <td class="data-table__cell">5.37</td>
  <td class="data-table__cell">6.05</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/category/uncategorized/</th>
</tr>
<tr>
  <td class="data-table__cell">6.37</td>
  <td class="data-table__cell">5.09</td>
  <td class="data-table__cell">5.73</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/tag/post-formats/</th>
</tr>
<tr>
  <td class="data-table__cell">6.99</td>
  <td class="data-table__cell">5.33</td>
  <td class="data-table__cell">6.16</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2008/06/</th>
</tr>
<tr>
  <td class="data-table__cell">7.08</td>
  <td class="data-table__cell">5.19</td>
  <td class="data-table__cell">6.13</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2011/06/hello-world/</th>
</tr>
<tr>
  <td class="data-table__cell">9.04</td>
  <td class="data-table__cell">7.21</td>
  <td class="data-table__cell">8.12</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">WordPress Average</th>
</tr>
<tr>
  <td class="data-table__cell">7.24</td>
  <td class="data-table__cell">5.64</td>
  <td class="data-table__cell">6.44</td>
 </tr>
</tbody>
</table>

I again reset the machine and installed [WP Super Cache](http://wordpress.org/extend/plugins/wp-super-cache/ "WP Super Cache") (v 0.9.9.9) and [W3 Total Cache](http://wordpress.org/extend/plugins/w3-total-cache/ "W3 Total Cache") (v 0.9.2.2). I did not enable or configure either of them however, I simply made the point in time after their installation my new "reset" point to save myself from having to do the installation before each test.

Up first was [WP Super Cache](http://wordpress.org/extend/plugins/wp-super-cache/ "WP Super Cache"). In the first set of tests, I simply enabled the plugin. This enabled caching via PHP, which while a noticeable boost could definitely be improved upon by modifying the configuration.

<table class="data-table">
<tbody>
<tr>
<th colspan="3" class="data-table__cell data-table__header">WP Super Cache</th>
</tr>
<tr>
  <th class="data-table__cell data-table__header">C=1</th>
  <th class="data-table__cell data-table__header">C=5</th>
  <th class="data-table__cell data-table__header">Overall</th>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">Frontpage</th>
</tr>
<tr>
  <td class="data-table__cell">165.23</td>
  <td class="data-table__cell">250.30</td>
  <td class="data-table__cell">207.77</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/category/uncategorized/</th>
</tr>
<tr>
  <td class="data-table__cell">177.06</td>
  <td class="data-table__cell">243.66</td>
  <td class="data-table__cell">210.36</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/tag/post-formats/</th>
</tr>
<tr>
  <td class="data-table__cell">178.37</td>
  <td class="data-table__cell">247.95</td>
  <td class="data-table__cell">213.16</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2008/06/</th>
</tr>
<tr>
  <td class="data-table__cell">179.78</td>
  <td class="data-table__cell">223.49</td>
  <td class="data-table__cell">201.64</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2011/06/hello-world/</th>
</tr>
<tr>
  <td class="data-table__cell">197.65</td>
  <td class="data-table__cell">251.99</td>
  <td class="data-table__cell">224.82</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">WordPress Average</th>
</tr>
<tr>
  <td class="data-table__cell">179.62</td>
  <td class="data-table__cell">243.48</td>
  <td class="data-table__cell">211.55</td>
 </tr>
</tbody>
</table>

For the second set of tests [WP Super Cache](http://wordpress.org/extend/plugins/wp-super-cache/ "WP Super Cache") was configured to use mod_rewrite with 304 redirects and compression enabled. This was a huge boost and more in line with what I'd been expecting.

<table class="data-table">
<tbody>
<tr>
<th colspan="3" class="data-table__cell data-table__header">WPSC mod_rewrite</th>
</tr>
<tr>
  <th class="data-table__cell data-table__header">C=1</th>
  <th class="data-table__cell data-table__header">C=5</th>
  <th class="data-table__cell data-table__header">Overall</th>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">Frontpage</th>
</tr>
<tr>
  <td class="data-table__cell">711.87</td>
  <td class="data-table__cell">754.69</td>
  <td class="data-table__cell">733.28</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/category/uncategorized/</th>
</tr>
<tr>
  <td class="data-table__cell">726.08</td>
  <td class="data-table__cell">811.72</td>
  <td class="data-table__cell">768.90</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/tag/post-formats/</th>
</tr>
<tr>
  <td class="data-table__cell">607.85</td>
  <td class="data-table__cell">843.43</td>
  <td class="data-table__cell">725.64</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2008/06/</th>
</tr>
<tr>
  <td class="data-table__cell">688.89</td>
  <td class="data-table__cell">775.45</td>
  <td class="data-table__cell">732.17</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2011/06/hello-world/</th>
</tr>
<tr>
  <td class="data-table__cell">718.62</td>
  <td class="data-table__cell">802.30</td>
  <td class="data-table__cell">760.46</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">WordPress Average</th>
</tr>
<tr>
  <td class="data-table__cell">690.66</td>
  <td class="data-table__cell">797.52</td>
  <td class="data-table__cell">744.09</td>
 </tr>
</tbody>
</table>

[W3 Total Cache](http://wordpress.org/extend/plugins/w3-total-cache/ "W3 Total Cache") has considerably more options than [WP Super Cache](http://wordpress.org/extend/plugins/wp-super-cache/ "WP Super Cache"), and was the focus of the rest of the tests. The inital test was again just to enable the plugin. For [W3 Total Cache](http://wordpress.org/extend/plugins/w3-total-cache/ "W3 Total Cache") this equates to using "disk enhanced" for Pages and enabling minify to use "disk". These two options were standard for the rest of the tests

<table class="data-table">
<tbody>
<tr>
<th colspan="3" class="data-table__cell data-table__header">W3 Total Cache</th>
</tr>
<tr>
  <th class="data-table__cell data-table__header">C=1</th>
  <th class="data-table__cell data-table__header">C=5</th>
  <th class="data-table__cell data-table__header">Overall</th>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">Frontpage</th>
</tr>
<tr>
  <td class="data-table__cell">590.83</td>
  <td class="data-table__cell">719.91</td>
  <td class="data-table__cell">655.37</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/category/uncategorized/</th>
</tr>
<tr>
  <td class="data-table__cell">641.28</td>
  <td class="data-table__cell">731.41</td>
  <td class="data-table__cell">686.34</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/tag/post-formats/</th>
</tr>
<tr>
  <td class="data-table__cell">589.42</td>
  <td class="data-table__cell">664.82</td>
  <td class="data-table__cell">627.12</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2008/06/</th>
</tr>
<tr>
  <td class="data-table__cell">602.60</td>
  <td class="data-table__cell">679.21</td>
  <td class="data-table__cell">640.90</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2011/06/hello-world/</th>
</tr>
<tr>
  <td class="data-table__cell">592.03</td>
  <td class="data-table__cell">772.38</td>
  <td class="data-table__cell">682.21</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">WordPress Average</th>
</tr>
<tr>
  <td class="data-table__cell">603.23</td>
  <td class="data-table__cell">713.54</td>
  <td class="data-table__cell">658.39</td>
 </tr>
</tbody>
</table>

For the second set of tests with [W3 Total Cache](http://wordpress.org/extend/plugins/w3-total-cache/ "W3 Total Cache") the object and database caches were enabled for "disk" as well. Surprisingly this had an adverse effect on performance.

<table class="data-table">
<tbody>
<tr>
<th colspan="3" class="data-table__cell data-table__header">W3TC with Disk</th>
</tr>
<tr>
  <th class="data-table__cell data-table__header">C=1</th>
  <th class="data-table__cell data-table__header">C=5</th>
  <th class="data-table__cell data-table__header">Overall</th>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">Frontpage</th>
</tr>
<tr>
  <td class="data-table__cell">620.16</td>
  <td class="data-table__cell">724.32</td>
  <td class="data-table__cell">672.24</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/category/uncategorized/</th>
</tr>
<tr>
  <td class="data-table__cell">609.74</td>
  <td class="data-table__cell">659.12</td>
  <td class="data-table__cell">634.43</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/tag/post-formats/</th>
</tr>
<tr>
  <td class="data-table__cell">591.00</td>
  <td class="data-table__cell">667.28</td>
  <td class="data-table__cell">629.14</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2008/06/</th>
</tr>
<tr>
  <td class="data-table__cell">613.67</td>
  <td class="data-table__cell">654.49</td>
  <td class="data-table__cell">634.08</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2011/06/hello-world/</th>
</tr>
<tr>
  <td class="data-table__cell">614.58</td>
  <td class="data-table__cell">643.76</td>
  <td class="data-table__cell">629.17</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">WordPress Average</th>
</tr>
<tr>
  <td class="data-table__cell">609.83</td>
  <td class="data-table__cell">669.79</td>
  <td class="data-table__cell">639.81</td>
 </tr>
</tbody>
</table>

For the third set of tests, I decided to leverage [APC](http://php.net/manual/en/book.apc.php "APC") for the object cache and disable the database cache. This didn't appear to make much of a difference from the second round.

<table class="data-table">
<tbody>
<tr>
<th colspan="3" class="data-table__cell data-table__header">W3TC with Object APC</th>
</tr>
<tr>
  <th class="data-table__cell data-table__header">C=1</th>
  <th class="data-table__cell data-table__header">C=5</th>
  <th class="data-table__cell data-table__header">Overall</th>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">Frontpage</th>
</tr>
<tr>
  <td class="data-table__cell">605.79</td>
  <td class="data-table__cell">664.28</td>
  <td class="data-table__cell">635.03</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/category/uncategorized/</th>
</tr>
<tr>
  <td class="data-table__cell">574.82</td>
  <td class="data-table__cell">630.44</td>
  <td class="data-table__cell">602.63</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/tag/post-formats/</th>
</tr>
<tr>
  <td class="data-table__cell">574.59</td>
  <td class="data-table__cell">680.13</td>
  <td class="data-table__cell">627.36</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2008/06/</th>
</tr>
<tr>
  <td class="data-table__cell">583.04</td>
  <td class="data-table__cell">656.13</td>
  <td class="data-table__cell">619.59</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2011/06/hello-world/</th>
</tr>
<tr>
  <td class="data-table__cell">637.33</td>
  <td class="data-table__cell">653.80</td>
  <td class="data-table__cell">645.56</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">WordPress Average</th>
</tr>
<tr>
  <td class="data-table__cell">595.11</td>
  <td class="data-table__cell">656.96</td>
  <td class="data-table__cell">626.04</td>
 </tr>
</tbody>
</table>

For the final set of tests, I reversed my choice from the previous tests and set the database cache to use [APC](http://php.net/manual/en/book.apc.php "APC") while disabling the object cache. Again, not much of a difference among the last three rounds of tests, and none performed as well as the initial set of tests that didn't leverage the database or object cache.

<table class="data-table">
<tbody>
<tr>
<th colspan="3" class="data-table__cell data-table__header">W3TC with DB APC</th>
</tr>
<tr>
  <th class="data-table__cell data-table__header">C=1</th>
  <th class="data-table__cell data-table__header">C=5</th>
  <th class="data-table__cell data-table__header">Overall</th>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">Frontpage</th>
</tr>
<tr>
  <td class="data-table__cell">613.32</td>
  <td class="data-table__cell">681.79</td>
  <td class="data-table__cell">647.56</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/category/uncategorized/</th>
</tr>
<tr>
  <td class="data-table__cell">591.80</td>
  <td class="data-table__cell">637.84</td>
  <td class="data-table__cell">614.82</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/tag/post-formats/</th>
</tr>
<tr>
  <td class="data-table__cell">582.74</td>
  <td class="data-table__cell">623.18</td>
  <td class="data-table__cell">602.96</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2008/06/</th>
</tr>
<tr>
  <td class="data-table__cell">620.42</td>
  <td class="data-table__cell">656.22</td>
  <td class="data-table__cell">638.32</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">/2011/06/hello-world/</th>
</tr>
<tr>
  <td class="data-table__cell">603.01</td>
  <td class="data-table__cell">661.88</td>
  <td class="data-table__cell">632.45</td>
 </tr>
 <tr>
  <th colspan="3" class="data-table__cell data-table__subheader">WordPress Average</th>
</tr>
<tr>
  <td class="data-table__cell">602.26</td>
  <td class="data-table__cell">652.18</td>
  <td class="data-table__cell">627.22</td>
 </tr>
</tbody>
</table>

I was surprised to see that the database and object caches were negatively impacting performance, but upon reflecting it seemed the likely cause was the virtual machine.

## The Conclusion

Both caching solutions at their best offer comparable performance. If you're looking at pure requests per second, [WP Super Cache](http://wordpress.org/extend/plugins/wp-super-cache/ "WP Super Cache") came out on top in my setup, but only when it was configured to leverage disk caching.

[W3 Total Cache](http://wordpress.org/extend/plugins/w3-total-cache/ "W3 Total Cache") has more options in regards to how you cache items, includes advanced support for using a content delivery network (or cookieless subdomain) and should definitely be a consideration if you're looking for a more technically advanced caching solution.

That said,  [WP Super Cache](http://wordpress.org/extend/plugins/wp-super-cache/ "WP Super Cache") is easy to setup and maintain and works really well so it should probably be the default choice for most people's caching needs.

I am a tinkerer however, so I ended up choosing [W3 Total Cache](http://wordpress.org/extend/plugins/w3-total-cache/ "W3 Total Cache") (as you can see by examing the source generated for this page) so that I could tweak it until I was content.

### Follow Up

After setting up [W3 Total Cache](http://wordpress.org/extend/plugins/w3-total-cache/ "W3 Total Cache") on my blog, I found some "quiet time" to do additional testing.

On my live server I did get about a 5% performance boost per cache (database and object) configured to use [APC](http://php.net/manual/en/book.apc.php "APC"), so I left them enabled for an easy 10% gain. This reinforces my point earlier about testing on a system as close to what you're deploying to as possible if you want accurate results.