/*global  */
(function() {
  'use strict';



  var app = angular.module('app.github');
  app.controller('DonutCtrl2', DonutCtrl2);
  DonutCtrl2.$inject = ['$scope','$log','$auth','GithubService','IdentityService'];
  var theChart;
  function DonutCtrl2($scope, $log,$auth, GithubService,IdentityService) {

    //    var deferred = GithubService.getRepos();
    //    deferred.then(function(val) {
    /*      $scope.gitRepos=val;
            $scope.contribs={};
            $scope.contribX=[];
            $scope.contribY=[];*/
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
      /*
var chartData=[],
xs=$scope.contribX,
ys=$scope.contribY;
for(var i = 0; i < xs.length; i++) {
var x=xs[i],y=ys[i];
chartData[i]={'label':x,'value':y};
};*/
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
      var cmts=[];
      GithubService.getRepos().then(function(val) {
        val.map(function(repo) {
          GithubService.getCommits(repo.owner.login,repo.name).then(function(r) {
            if (r!==undefined) {
              cmts.push({'repo':repo.full_name,'value':r});
              $scope.commits=cmts;
//              $scope.$apply();
                  d3.select("#chart2 svg")
                  .datum(theData())
                  .transition().duration(350)
                  .call(theChart);

              //=$scope.contribs;
              /*              r.map(function(u) {
                              $scope.contribs[repo.full_name][u.author.login]=u.total;

                              });
               */            };           
          });
        });
      });
      
      /* val.map(function(repo) {
         $scope.contribs[repo.full_name]={};
         var nm=repo.full_name, cmt=repo.size;
         $scope.contribX.push(nm);
         $scope.contribY.push(cmt);
         var def = GithubService.getCommits(repo.owner.login,repo.name);
         def.then(function(r) {
         if (r!==undefined) {

         r.map(function(u) {
         $scope.contribs[repo.full_name][u.author.login]=u.total;
         $scope.commits=$scope.contribs;
         //              chart.update();
         }); //end r.map
         };//end if
         }); //end def.then
         });//end val.map*/
    }; //end getData
    getData();
    //  });//end deferred.then
  };//end DonutCtrl
  

}());
