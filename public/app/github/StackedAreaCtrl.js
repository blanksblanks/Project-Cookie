/*global  */
(function() {
  'use strict';
  var app = angular.module('app.github');
  app.controller('StackedAreaCtrl', StackedAreaCtrl);
  StackedAreaCtrl.$inject = ['$scope','$log','$auth','GithubService','IdentityService'];
  var theChart;
  function StackedAreaCtrl($scope, $log,$auth, GithubService,IdentityService) {
    $scope.activity=$scope.contributors=$scope.repos=[];
    nv.addGraph(function() {
      var chart = nv.models.stackedAreaChart()
                  .margin({right: 100})
                  .x(function(d) { return d[0] })   //We can modify the data accessor functions...
                  .y(function(d) { return d[1] })   //...in case your data is formatted differently.
                  .useInteractiveGuideline(true)    //Tooltips which show all data points. Very nice!
                  .rightAlignYAxis(true)      //Let's move the y-axis to the right side.
                 // .transitionDuration(500)
                  .showControls(true)       //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
                  .clipEdge(true);
      ;
      //Format x-axis labels with custom function.
      chart.xAxis
      .tickFormat(function(d) { 
        return d3.time.format('%x')(new Date(d)); 
      });

      chart.yAxis
      .tickFormat(d3.format(',.2f'));
      theChart=chart;
      return chart;

    });//end addgraph
    function theData() {
      //foreach day, get the date, total number of commits, and approximate number of commits per user
      var activity=$scope.activity[$scope.repos.indexOf($scope.selectedRepo)].value,
          weeks=activity.length;

      var data=[];
      $scope.contributors[$scope.repos.indexOf($scope.selectedRepo)].value.map(function(usr,usridx,arrusr) {
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
    //    $scope.selectedRepo=0;
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
              d3.select("#stackedAreaChart svg")
              .datum(theData())
              .transition().duration(350)
              .call(theChart);
            }
          });//end getContributors
          GithubService.getActivities(repo.owner.login,repo.name).then(function(r) {
            if (r!==undefined) {
              activity.push({'repo':repo.full_name,'value':r});
              $scope.activity=activity;
            };
            if(--j===0 && i===0) {

              d3.select("#stackedAreaChart svg")
              .datum(theData())
              .transition().duration(350)
              .call(theChart);
            }
          });//end getActivity

        });//end val.map
      });//end getRepos
    }; //end getData
    getData();
  };//end StackedAreaCtrl

}());
