
(function() {
  'use strict';
  var app = angular.module('app.github');
  app.controller('ClineCtrl', ClineCtrl);
  ClineCtrl.$inject = ['$scope','$log','$auth','GithubService','IdentityService'];
  var theChart;
  function ClineCtrl($scope,$log,$auth,GithubService,IdentityService) {
    $scope.activity=$scope.contributors=$scope.repos=[];
    $scope.draw=0;
    $scope.drawChart = function() {
      if($scope.draw===0) {return 'calculating...'+$scope.selectedRepo;};
              d3.select("#cumulativeLineChart svg")
              .datum(theData())
              .transition().duration(350)
              .call(theChart);
    }
    nv.addGraph(function() {
      var chart = nv.models.cumulativeLineChart()
        .x(function(d) { return d[0] })
        .y(function(d) { return d[1]/100 }) //adjusting, 100% is 1.00, not 100 as it is in the data
        .color(d3.scale.category10().range())
        .useInteractiveGuideline(true);

        chart.xAxis
        .tickValues([1398553200,1408230000,1416700800,1429401600])
        .tickFormat(function(d) {
          return d3.time.format('%x')(new Date(d))
        });

        chart.yAxis
        .tickFormat(d3.format(',.1%'));

    //TODO: Figure out a good way to do this automatically
    nv.utils.windowResize(chart.update);

    theChart = chart;
    return chart;
    }); // end of add graph

    function theData() {
      //foreach day, get the date, total number of commits, and approximate number of commits per user
      var activity=$scope.activity.filter(function(val) {
                     return val.repo===$scope.selectedRepo;
                   }),
          contribs=$scope.contributors.filter(function(val) {
                     return val.repo===$scope.selectedRepo;
                   }),
          weeks=activity.length,
          data=[];
      if (activity[0] === undefined || activity[0].value.length === undefined) {
        activity=[];
      } else {
        activity=activity[0].value;
      }
      if (contribs[0] === undefined || contribs[0].value.length === undefined) {
        contribs=[];
      } else {
        contribs=contribs[0].value;
      }
      contribs.map(function(usr,usridx,arrusr) {
        var days=[];
        //        days[0]=days[weeks*7]={};
        var usrdata={'key': usr.author.login};
        usr.weeks.map(function(wk,wkidx,arrwks) {
          activity.map(function(act_week,act_idx,acts) {
            if (wk.w===act_week.week) {
              for(var i = 0; i < 7; i++) {
                days[7*wkidx+i]=[];
                days[7*wkidx+i][0]=(1000*(wk.w+86400*i));
                //                days[act_idx+i].total=tot;
                if(act_week.total===0) {
                  days[7*wkidx+i][1]=0;
                } else {
                  days[7*wkidx+i][1]=wk.c*act_week.days[i]/act_week.total;
                }
              }//end for
            }//endif
          });//end activity.map
        });//end usr.weeks.map
        usrdata.values=days;
        data.push(usrdata);
      });//end $scope.contributors.map
      return data;
    };

    function getData() {
      var contributors=[],
          activity=[],
          i,
          j;
      GithubService.getRepos().then(function(val) {
        //        $scope.repos=val;
        i=j=val.length;
        val.map(function(repo) {
          $scope.repos.push(repo.full_name);
          $scope.selectedRepo=$scope.repos[0];
          GithubService.getContributors(repo.owner.login,repo.name).then(function(r) {
            if (r!==undefined) {
              contributors.push({'repo':repo.full_name,'value':r});
              $scope.contributors=contributors;
            };
            if(--i===0 && j===0) {
              $scope.draw=1;
              $scope.drawChart();
            }
          });//end getContributors
          GithubService.getActivities(repo.owner.login,repo.name).then(function(r) {
            if (r!==undefined) {
              activity.push({'repo':repo.full_name,'value':r});
              $scope.activity=activity;
            };
            if(--j===0 && i===0) {
              $scope.draw=1;
              $scope.drawChart();
            }
          });//end getActivity

        });//end val.map
      });//end getRepos
    }; //end getData
    getData();
  }; // end ClineCtrl

}());