/*global  */
(function() {
  'use strict';



  var app = angular.module('app.github');
  app.controller('DonutCtrl', DonutCtrl);
  DonutCtrl.$inject = ['$scope','$log','$auth','GithubService','IdentityService'];
  var theChart;
  function DonutCtrl($scope, $log,$auth, GithubService,IdentityService) {
    $scope.commits=[];
    var chart = nv.addGraph(function() {
                  var chart = nv.models.pieChart()
                              .x(function(d) { return d.label })
                              .y(function(d) { return d.value })
                              .showLabels(true)     //Display pie labels
                              .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
                              .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                              .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
                              .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
                  ;

                  d3.select("#chart2 svg")
                  .datum(theData())
                  .transition().duration(350)
                  .call(chart);
                  theChart=chart;
                  return chart;
                });//end addgraph
    function theData() {
      var commitStats=$scope.commits.map(function(obj) {
                        var val=obj.value.filter(function(u) {
                                  return u.author.login=IdentityService.currentUser().gitname;
                                })[0].total;
                        return {'label':obj.repo,'value':val};
                      });
      if(commitStats.length===0) {return [{'label':0,'value':0}];};
      return commitStats;
    };
    function getData() {
      var cmts=[],i;
      GithubService.getRepos().then(function(val) {
        i=val.length;
        val.map(function(repo) {
          GithubService.getCommits(repo.owner.login,repo.name).then(function(r) {
            if (r!==undefined) {
              cmts.push({'repo':repo.full_name,'value':r});
              $scope.commits=cmts;
            };
            if(--i===0) {
              d3.select("#chart2 svg")
              .datum(theData())
              .transition().duration(350)
              .call(theChart);
            }
          });//end getCommits
        });//end val.map
      });//end getRepos
    }; //end getData
    getData();
  };//end DonutCtrl

}());
