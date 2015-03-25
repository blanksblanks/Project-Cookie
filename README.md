# GitVis :octocat:

##About GitVis

####Problem
GitHub has become a major social network for many developers. It changes the way we collaborate and share things. As users who want to better understand our git activities, however, we found existing tools lacking. While GitHub does offer graph services, it only tracks the number of commits per day and activities of a particular repository with limited options for an individual's activity.
####Solution
We are going to build an interactive data visualization of activities of a GitHub user in addition to his/her repositories.
####Tools & Libraries
[GitHub API](https://developer.github.com/v3/), [D3](http://d3js.org/), Angular, Mongoose, Express, Node

##Team Name: Project Cookie:cookie:

| UNI      | Github Username  | Full Name      | School      | Year |
|---------:|------------------|----------------|-------------|------|
|  nb2406  | blanksblanks     | Nina Baculinao | CE (prev CC)| 2015 |
|  yob2000 | ozzieba          | Oz Ben-Ami     | SEAS        | 2015 |
|  jzf2101 | jzf2101          | Jessica Forde  | CE            |   2015   |
|  bh2447  | bingyanzen       | Bingyan Hu     | BC          | 2016 |
|  ch2994  | ch2994           | Cheng Huang    | SEAS        | 2016 |

##Local Installation

Make sure you have the necessary .env and .envdist files!

```shell
npm install
bower install
grunt build
node server.js
```

##MVP Milestones

Week 1 (2/15 - 2/21/2015)
- [x] Research D3 and Github API and create a Wiki page for such information
- [x] INITIAL PROJECT OUTLINE DUE SUN 2/15 @ 11:59PM

Week 2 (2/22 - 2/28/2015) - _finishing a basic build_
- [x] Set up OAuth for GitHub and make the static mockups for the visualization graphs
- [x] FIRST MILESTONE DUE SUN 2/22 @ 11:59PM
- [X] All day intensive workshop for team projects on Sat 2/28

Week 3 (3/1 - 3/7/2015) - _finishing all core functionality_
- [x] Set up the mechanism to request data and information from Github
- [X] SECOND MILESTONE DUE SUN 3/1 @ 11:59PM

Week 4 (3/8 - 3/11/2015) - _finishing the polish_
- [x] Make visualizations go live on Heroku
- [X] FINAL PROJECT DUE SUN 3/8 @ 11:59PM
- [ ] LAST CLASS (DEMOS) ON WED 3/11 @ 2:10PM

##Quick Demo

Note: Currently there are some placeholder images where the development of graph visualization is still in progress, but all the graphs should be implemented by May 2015. Check back soon!

Log in using GitHub authentication
![login](http://cl.ly/image/1T3f3c3p0z3L/Image%202015-03-24%20at%206.40.21%20PM.png)

Stacked chart example of an individual repo
![stacked](http://cl.ly/image/211o2E1Z3W0G/Image%202015-03-24%20at%206.42.27%20PM.png)

Donut chart of all repos (may not load if you have too many repos)
![donut](http://cl.ly/image/052e0q3A2B00/Image%202015-03-24%20at%206.43.29%20PM.png)
>>>>>>> upstream/master

Click gitinfo to see the raw data in unprocessed text form
![gitinfo](http://cl.ly/image/0c0M1G0m060U/Image%202015-03-24%20at%206.41.21%20PM.png)

##More Information
This is an open source project we developed as the final project for our Advanced JavaScript class at Columbia University. Check out our Wiki Pages for more information about our planning and research process:
* [Home](https://github.com/blanksblanks/project-cookie/wiki)
* [Architecture](https://github.com/blanksblanks/project-cookie/wiki/Architecture)
* [GitHub API](https://github.com/blanksblanks/project-cookie/wiki/GitHub-API)
* [Interactive Data Visualization in JS](https://github.com/blanksblanks/project-cookie/wiki/Interactive-Data-Visualization-in-JS)
* [Mockup](https://github.com/blanksblanks/project-cookie/wiki/Mockup)
* [Mockup](https://github.com/blanksblanks/project-cookie/wiki/Mockup)
* [Meeting Notes](https://github.com/blanksblanks/project-cookie/wiki/Notes-from-Meeting-with-Lev-(2-18-15))