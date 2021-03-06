#AngularJS Set-Up Guide

Install Node.js from https://nodejs.org/en/download.
Install Git from https://git-scm.com/downloads.

**npm** (Node Package Manager) is installed as part of Node.js.
Using npm, install bower and http-server:
```	
npm install http-server -g
npm install bower -g
```

http-server will locally host your single-page web application.
Bower is a front-end package manager that will fetch, install and organize the right versions of packages that your web application uses.

<span style="font-size: x-small">Aside: npm vs Bower?
They are both package managers. Bower is for front-end, npm is for node modules for back-end node.js applications.
npm uses a pontentially heavy nested dependency tree. npm takes care of organizing different versions of the same package used in different layers of your project. It is most optimal to use when space is abundant, on a big server for an example. 
Bower uses a light flat dependency tree that installs the required packages only once for the entire project. This saves space so that the front-end component of your project can be loaded quickly, however leaving the developer with the burden of resolving the version dependencies themselves.
In short, npm saves development time, while Bower saves runtime. </sup>

To begin a new project, create an empty directory, cd into it, and run:
```
bower init
```
This will create the bower.json file which keeps track of all the packages Bower installs.

Install the required packages for angular:
	bower install angular --save
	bower install angular-bootstrap --save
	bower install angular-ui-router --save

	--save is to save the installed packages into the project's bower.json dependencies for future reference.

	AngularUI router changes your application views based on the state of the application rather than the URL. This means views can change even if the URL does not change.

index.html

	<!DOCTYPE html>
	<html ng-app="appName">

		<head>
			<title ng-bind="($title ? $title : '')>App</title>
			<base href="/path/to/your/app">
			<!-- bower:css -->
			<!-- endbower -->
			<link rel="stylesheet" href="style/main.css" type="text/css" />
			<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
		</head>

		<body>
			<nav>
				<ul>
					<li ui-sref-active="active"><a ui-sref="page1">Page 1</a></li>
					<li ui-sref-active="active"><a ui-sref="page2">Page 2</a></li>
				</ul>
			</nav>

			<ui-view>
				<!-- page content is dynamically inserted inside this tag by angular -->
			</ui-view>
		</body>

		<!-- bower:js -->
		<!-- endbower -->

		<script src="app.js"></script>s
		<script src="controllers/page1.js"></script>
		<script src="controllers/page2.js"></script>
	</html>

index.html will centrally hold all dependencies so that they may be loaded only once.
(Mouse over information)
ng-app marks the root of your AngularJS application.
ng-bind will replace the text content of the element with the given expression, and to update the content when the value of the expression changes.
Set base href as root of your project for development phase.
ui-sref is a directive that binds a link to a state defined in app.js. The template of the said state is loaded into ui-view. A directive is essentially a function executed in its scope.
ui-sref-active works alonside ui-sref. When an element is active, the CSS classes defined by the corresponding ui-sref-active is added to that element.

At this point, you're wondering what is <!-- bower:js --><!-- endbower -->. 
You can use wiredep to wire Bower dependencies to your source code:
	wiredep -s index.html
This will insert the three packages you've installed above, namely:
	<!-- bower:js -->
		<script src="bower_components/angular/angular.js"></script>
		<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
		<script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
	<!-- endbower -->

Run the command every time you install new dependencies.

app.js is where you define a state for each page with a different URL. Each state includes an HTML template and a Javascript controller. Essentially, each state describes what the UI will look like and behave when it is active.

app.js
	angular.module('appName', ['ui.router', 'ui.bootstrap'])
		.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
			$urlRouterProvider.otherwise("/");
			$locationProvider.html5Mode(true);
			$stateProvider
				.state('page1', {
					url: "/page1",
					controller : 'Page1Ctrl',
					templateUrl : 'views/page1.html',
				    resolve: {
				        $title: function() {
				            return 'Page1';
				        }
				    }
				})
				.state('page2', {
					url: "/page2",
					controller : 'Page2Ctrl',
					templateUrl : 'views/page2.html',
				    resolve: {
				        $title: function() {
				            return 'Page2';
				        }
				    }
				});
		}).run(function($rootScope) {
		});

(mouse over)
Include plug-ins in an array
An angular module is a container for different parts of your app.
angular.module().config() executes the function parameter on module load
angular.module().run() contains code to run when index.html loads
$stateProvider defines the states
$urlRouterProvider is used for otherwise() to route invalid paths to /
$locationProvider is used for .html5Mode(true). This allows for use of regular URL path and search segments (using HTML5 history API), instead of hashbang URLs. HTML5 mode intercepts and rewrites <a> links to regular URL path and search segments in a way that never peerforms a full page reload, which requires server-side configuration. If HTML5 History API is not supported, the $location service will fall back to using the hashbang URLs automatically.
$title value will replace the content of the ng-bind element from index.html

You now need to create HTML view template files and JS controller files for each state that you've created in app.js.
For the controller files, it should have this skeleton:
	angular.module('appName')
		.controller('Page1Ctrl', function($scope) {
		$scope.someVariable = "Hello World";
		$scope.someList = [1, 2, 3, 4, 5];
	});

In your HTML file, like this one:
	<h2>{{someVariable}}</h2>
	<p ng-repeat="number in someList">{{number}}</p>

You can refer to all $scope variables defined in the corresponding controller using the double curly braces {{ }}.
ng-repeat is a for-loop that will print all the elements in someList.

Reference: Kristian Picon's Guide (link)
https://scotch.io/tutorials/angular-routing-using-ui-router

https://stackoverflow.com/questions/11605917/this-vs-scope-in-angularjs-controllers