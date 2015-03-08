(function() {
  'use strict';



  var app = angular.module('app.github');
  app.controller('DonutCtrl', DonutCtrl);
  DonutCtrl.$inject = ['$scope','$log','GithubService'];
  function DonutCtrl($scope, $log, GithubService) {

    var deferred = GithubService.getRepos();
    deferred.then(function(val) {
      $scope.gitRepos=val;
      $scope.contribs={};
      $scope.contribX=[];
      $scope.contribY=[];
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

        return chart;
      });//end addgraph
      function theData() {
        var chartData=[],
            xs=$scope.contribX,
            ys=$scope.contribY;
        for(var i = 0; i < xs.length; i++) {
          var x=xs[i],y=ys[i];
          chartData[i]={'label':x,'value':y};
        };
      return chartData;
      };

    
      val.map(function(repo) {
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
      });//end val.map
    });//end deferred.then
};//end DonutCtrl
  

}());
