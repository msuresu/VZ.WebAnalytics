﻿
var app = angular.module('WebAnalytics', []);
app.factory('WebAnalyticsFactory', ['$http', '$interval', '$window', '$q', '$sce', '$rootScope', function ($http, $interval, $window, $q, $sce, $rootScope) {
	var WebAnalyticsFactory = {};
	var DasboardURL = "http://localhost:53373/TrackerRestService.svc/GetDashboard";

	WebAnalyticsFactory.GetDashboardContent = function (request) {
		var deferred = $q.defer();

		$http({
			url: DasboardURL + "/" + request,
			dataType: "json/application",
			method: "GET",			
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			}
		}).success(function (data) {
			deferred.resolve(data);
		}).error(function (error) {
			deferred.reject("Error");
		});

		return deferred.promise;
	}
	WebAnalyticsFactory.Insert1 = function (request) {
		var deferred = $q.defer();

		$http({
			url: "http://localhost:53373/TrackerRestService.svc/InsertUserActivity",
			dataType: "json/application",
			method: "POST",
			data: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			}
		}).success(function (data) {
			deferred.resolve(data);
		}).error(function (error) {
			deferred.reject("Error");
		});

		return deferred.promise;
	}
	return WebAnalyticsFactory;
}]);

app.controller('WebAnalyticsCtrl', ['$scope', '$interval', '$window', '$rootScope', 'WebAnalyticsFactory', function ($scope, $interval, $window, $rootScope, WebAnalyticsFactory) {

	arrDateTime = ["10/26/2015", "10/26/2015", "10/26/2015", "10/26/2015"];
	arrNoOfVisters = [100, 29, 49, 70];
	//DrawLineGraph("siteMetrcis", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits");
	//DrawSmallLineGraph("siteMetrcis1", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits")
	//DrawSmallLineGraph("siteMetrcis2", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits")
	//DrawSmallLineGraph("siteMetrcis3", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits")
	//DrawSmallLineGraph("siteMetrcis4", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits")
	
	var UserActiveity = {};
	UserActiveity = {ActivityType:"PageType",DomainName:"11122222"};
	WebAnalyticsFactory.GetDashboardContent("Domainanme").then(function (Response) {
		var tes = Response;
		if(Response)
		{
			if(Response.objSiteMetrics)
			{
				var arrDateTime = []; var arrNoOfVisters = []; var totalVistCount = 0;
				for(var i=0;i<Response.objSiteMetrics.length;i++)
				{
					arrDateTime.push(Response.objSiteMetrics[i].Date);
					arrNoOfVisters.push(Response.objSiteMetrics[i].VisitCount)
					totalVistCount += Response.objSiteMetrics[i].VisitCount;
				}
				$scope.TotalVistCount = totalVistCount;
				DrawLineGraph("siteMetrcis", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits");
				DrawSmallLineGraph("siteMetrcis1", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits");
			}
			if(Response.objUniqueVisits)
			{
				var arrDateTime1 = []; var arrNoOfVisters1 = []; var totalVistCount1 = 0;
				for (var i = 0; i < Response.objUniqueVisits.length; i++) {
					arrDateTime1.push(Response.objUniqueVisits[i].Date);
					arrNoOfVisters1.push(Response.objUniqueVisits[i].UniqueCount)
					totalVistCount1 += Response.objUniqueVisits[i].UniqueCount;
				}
				$scope.TotalUniqueCount = totalVistCount1;				
				DrawSmallLineGraph("siteMetrcis2", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits");
			}
			if (Response.objPagesPerViews) {
				var arrDateTime1 = []; var arrNoOfVisters1 = []; var totalVistCount1 = 0;
				for (var i = 0; i < Response.objPagesPerViews.length; i++) {
					arrDateTime1.push(Response.objPagesPerViews[i].Date);
					arrNoOfVisters1.push(Response.objPagesPerViews[i].PagePerViewCount)
					totalVistCount1 += Response.objPagesPerViews[i].PagePerViewCount;
				}
				$scope.TotalViewCount = totalVistCount1;
				$scope.TotalPerViewViewCount = 0;
				if ($scope.TotalVistCount && $scope.TotalVistCount > 0 && $scope.TotalViewCount && $scope.TotalViewCount>0)
				{
					$scope.TotalPerViewViewCount = Math.round(($scope.TotalViewCount / $scope.TotalVistCount), 2);
				}
				DrawSmallLineGraph("siteMetrcis3", arrDateTime1, arrNoOfVisters1, "Site Metrics", "Visits");
				DrawSmallLineGraph("siteMetrcis4", arrDateTime1, arrNoOfVisters1, "Site Metrics", "Visits");
			}
			if(Response.objVisterType)
			{
				var jsonData = [];
				var test = {};
				test = { name: "Repeat Visitors", y: Response.objVisterType.RepeatvistorPer, count: Response.objVisterType.Repeatvistor };
				jsonData.push(test);
				test = { name: "New Visitors", y: Response.objVisterType.NewvistorPer, count: Response.objVisterType.Newvistor };
				jsonData.push(test);
				DrawPieChart(visterTypeBarChart, '', jsonData);
			}

			
		}
	}).finally(function () {
		
	});

	
}]);