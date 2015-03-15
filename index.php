<!DOCTYPE html>
<html lang="en" ng-app="phoodeez">
  <head>
    <meta charset="utf-8">
    <title><?php bloginfo('name'); ?></title>

    <link href='http://fonts.googleapis.com/css?family=Crete+Round' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet' type='text/css'>

    <meta name="description" content="">
    <meta name="author" content="">
    
    <!-- Mobile Specific Meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>

    <base href="http://localhost/~tylersmith/incognito/">
    <?php wp_head(); ?>
   
  </head>
  <body>
  
   <body ng-controller="ApplicationController">
    <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-phoodeez navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand phoodeez-brand" ui-sref="home">Phoodeez
          	<p>Good Food @ Work</p>
          </a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav pull-right navbar-nav-phoodeez">

            <li ng-show="!loggedIn">
            	<a ui-sref="services">Services</a>
            </li>

            <li ng-show="loggedIn">
            	<a ui-sref="calendar">Calendar</a>
            </li>

            <li ng-show="!loggedIn">
            	<a href="#" ng-cloak ng-click="open('login')">Sign in</a>
            </li>

            <li class="dropdown" ng-show="loggedIn" dropdown>
              <a href="#" class="dropdown-toggle" dropdown-toggle data-toggle="dropdown">
                    <span ng-cloak>{{loggedIn.first_name}} {{loggedIn.last_name}} <span class="caret"></span></span>
              </a>
              <ul class="dropdown-menu dropdown-menu-right" role="menu">
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Order History</a></li>
                    <li><a href="#">Payments</a></li>
                    <li><a href="#" ng-click="logout();">Logout</a></li>
              </ul> 


            </li>

            <li id="cart-dropdown" ng-class="{active: cartToggle}">
               <a href="#" ng-click="cartFctn()" class="cart_dropdown">
               <div class="cartTotal" ng-show="total().total>0">{{ total().total | currency }}</div>
               <span class="glyphicon glyphicon-shopping-cart custom-cart"></span></a>
            </li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
      <div ui-view="viewCart"></div>
    </nav>


  <!-- Begin page content -->
	<div class="container-fluid">
	    <div ui-view="viewContent"></div>
	</div>

    <!-- End page content -->
    <footer class="footer">
      <div class="container">
        <a ui-sref="about">About</a> | <a ui-sref="contact">Contact</a> | <a ui-sref="feedback">Feedback</a> | <a ui-sref="jobs">Jobs</a> | <a ui-sref="home">Privacy Policy</a>
      </div>
   </footer>

<div ng-include="'http://localhost/~tylersmith/incognito/wp-content/themes/phoodeez/app/partials/modals.html'"></div>
    <?php wp_footer(); ?>
  </body>
</html>