# GitVis :octocat:

### About GitVis

**Problem:** GitHub has become the social network for all developers. It changes the way how we collaborate and share things. As a user who wants to better understand his/her git activities, however, there are very few good existing tools to use. GitHub does offer graph service, but it only tracks activities of a particular repository and only static data with limited options.
**Solution:** We are going to build an interactive data visualization of activities of a GitHub user/repo.
**Tools/Libraries:** d3.js([http://d3js.org/](http://d3js.org/)), GitHub API, Angular, Mongoose, Express, Node

### Demo

Main page when you visit http://project-cookie.herokuapp.com/
![main](http://cl.ly/image/0c3z2O0W2z2x/Image%202015-03-24%20at%206.39.46%20PM.png)

Log in using GitHub authentication
![login](http://cl.ly/image/1T3f3c3p0z3L/Image%202015-03-24%20at%206.40.21%20PM.png)

Stacked chart example of an individual repo
![stacked](http://cl.ly/image/211o2E1Z3W0G/Image%202015-03-24%20at%206.42.27%20PM.png)

Donut chart (may not load if you have too many repos)
![donut](http://cl.ly/image/052e0q3A2B00/Image%202015-03-24%20at%206.43.29%20PM.png)

Click gitinfo to see the raw data in unprocessed text form
![gitinfo](http://cl.ly/image/0c0M1G0m060U/Image%202015-03-24%20at%206.41.21%20PM.png)

### TEAM NAME: Project Cookie:cookie:

### TEAM MEMBERS:

| UNI      | Github username  | Full Name      | School      | Year |
|---------:|------------------|----------------|-------------|------|
|  nb2406  | blanksblanks     | Nina Baculinao | CE (prev CC)| 2015 |
|  bh2447  | bingyanzen       | Bingyan Hu     | BC          | 2016 |
|  ch2994  | ch2994           | Cheng Huang    | SEAS        | 2016 |
|  yob2000 | ozzieba          | Oz Ben-Ami     | SEAS        | 2015 |
|  jzf2101 | jzf2101          | Jessica Forde  | CE            |   2015   |

###Local Installation

Make sure you have the necessary .env and .envdist files!

```shell
cd col-ang-gen/
npm install
bower install
grunt build
node server.js ```

## MVP Milestones

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