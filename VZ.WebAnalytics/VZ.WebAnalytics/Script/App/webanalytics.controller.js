
var app = angular.module('WebAnalytics', []);
app.factory('WebAnalyticsFactory', ['$http', '$interval', '$window', '$q', '$sce', '$rootScope', function ($http, $interval, $window, $q, $sce, $rootScope) {
	var WebAnalyticsFactory = {};
	var DasboardURL = "http://localhost:53373/TrackerRestService.svc/GetDashboard";
	var PerformanceURL = "http://localhost:53373/TrackerRestService.svc/GetPagePerformance";

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
	WebAnalyticsFactory.GetPagePerformance = function () {
		var deferred = $q.defer();

		$http({
			url: PerformanceURL,
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

app.controller('WebAnalyticsCtrl', ['$scope', '$interval', '$window', '$rootScope', 'WebAnalyticsFactory', '$timeout', function ($scope, $interval, $window, $rootScope, WebAnalyticsFactory, $timeout) {

	arrDateTime = ["10/26/2015", "10/26/2015", "10/26/2015", "10/26/2015"];
	arrNoOfVisters = [100, 29, 49, 70];
	//DrawLineGraph("siteMetrcis", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits");
	//DrawSmallLineGraph("siteMetrcis1", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits")
	//DrawSmallLineGraph("siteMetrcis2", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits")
	//DrawSmallLineGraph("siteMetrcis3", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits")
	//DrawSmallLineGraph("siteMetrcis4", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits")

	var UserActiveity = {};
	$scope.TopContents = [];
	$scope.TotalPerViewViewCount = 0;
	$scope.TotalVistCount = 0;
	$scope.TotalUniqueCount = 0;
	$scope.TotalViewCount = 0;
	$scope.IsDashBoard = true;
	$scope.DomainName = "localhost";
	UserActiveity = { ActivityType: "PageType", DomainName: "11122222" };
	$scope.MenuClick = function (strMenuName) {
		if (strMenuName == "Dashboard") {
			$scope.IsDashBoard = true;
			$scope.IsPageView = false;
			$scope.IsPerformance = false;
		}
		else if (strMenuName == "Performance") {
			$scope.IsDashBoard = false;
			$scope.IsPageView = false;
			$scope.IsPerformance = true;
		}
		else {
			$scope.IsDashBoard = false;
			$scope.IsPageView = true;
			$scope.IsPerformance = false;
			if ($scope.OverAllDasboard) {

				if ($scope.OverAllDasboard.objTopContents) {
					$scope.TopContentsAll = $scope.OverAllDasboard.objTopContents;
				}
				if ($scope.OverAllDasboard.objActionContents) {
					$scope.TopContentsAction = $scope.OverAllDasboard.objActionContents;
				}
				if ($scope.OverAllDasboard.objPagesPerViews) {
					var arrDateTime1 = []; var arrNoOfVisters1 = []; var totalVistCount1 = 0;
					for (var i = 0; i < $scope.OverAllDasboard.objPagesPerViews.length; i++) {
						arrDateTime1.push($scope.OverAllDasboard.objPagesPerViews[i].Date);
						arrNoOfVisters1.push($scope.OverAllDasboard.objPagesPerViews[i].PagePerViewCount)

					}
					$timeout(function () { DrawLineGraph("siteMetrcisPageViews", arrDateTime1, arrNoOfVisters1, "Page Viwes", "Page Viwes Count"); });


				}
			}
		}
	};
	$scope.GetDuration = function (strStartTime, strEndTime) {
		return (new Date(strEndTime).getTime() - new Date(strStartTime).getTime()) / 1000;
	}
	$scope.OverAllDasboard = [];
	$scope.init = function () {
		WebAnalyticsFactory.GetDashboardContent($scope.DomainName).then(function (Response) {
			$scope.OverAllDasboard = Response;
			if (Response) {
				if (Response.objSiteMetrics) {
					var arrDateTime = []; var arrNoOfVisters = []; var totalVistCount = 0;
					for (var i = 0; i < Response.objSiteMetrics.length; i++) {
						arrDateTime.push(Response.objSiteMetrics[i].Date);
						arrNoOfVisters.push(Response.objSiteMetrics[i].VisitCount)
						totalVistCount += Response.objSiteMetrics[i].VisitCount;
					}
					$scope.TotalVistCount = totalVistCount;
					DrawLineGraph("siteMetrcis", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits");
					DrawSmallLineGraph("siteMetrcis1", arrDateTime, arrNoOfVisters, "Site Metrics", "Visits");
				}
				if (Response.objUniqueVisits) {
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
					if ($scope.TotalVistCount && $scope.TotalVistCount > 0 && $scope.TotalViewCount && $scope.TotalViewCount > 0) {
						$scope.TotalPerViewViewCount = Math.round(($scope.TotalViewCount / $scope.TotalVistCount), 2);
					}
					DrawSmallLineGraph("siteMetrcis3", arrDateTime1, arrNoOfVisters1, "Site Metrics", "Visits");
					DrawSmallLineGraph("siteMetrcis4", arrDateTime1, arrNoOfVisters1, "Site Metrics", "Visits");
				}
				if (Response.objVisterType) {
					var jsonData = [];
					var test = {};
					test = { name: "Repeat Visitors", y: Response.objVisterType.RepeatvistorPer, count: Response.objVisterType.Repeatvistor };
					jsonData.push(test);
					test = { name: "New Visitors", y: Response.objVisterType.NewvistorPer, count: Response.objVisterType.Newvistor };
					jsonData.push(test);
					DrawPieChart(visterTypeBarChart, '', jsonData);
				}
				if (Response.objTopContents) {
					$scope.TopContents = Response.objTopContents;
				}


			}
		}).finally(function () {

		});
		WebAnalyticsFactory.GetPagePerformance().then(function (Response) {
			$scope.PagePerformance = Response;
		}).finally(function () {

		});
	}

	$scope.init();

}]);