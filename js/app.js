angular.module('adMoney', ['ngMaterial'])
.controller('main', function($scope, $timeout, $interval) {
  $scope.you = {
    id: 1,
    name: "Maconheiro",
    money: 1.00,
    nivel: 1,
  };

  $scope.list_things = [
     {
       id: 1,
       name: "Limonada",
       image: "../img/limao.png",
       sell_cost: 1.00,
       value_cost: 50.00,
       manager_cost: 500.00,
       nivel: 1,
       quantity: 1,
       delay: 1000
     },
    {
       id: 2,
       name: "Tomate",
       image: "../img/tomate.png",
       sell_cost: 6.70,
       value_cost: 105.00,
       manager_cost: 1200.00,
       nivel: 2,
       quantity: 0,
       delay: 3000
     },
     {
       id: 3,
       name: "Banana",
       image: "../img/banana.png",
       sell_cost: 15.00,
       value_cost: 700.00,
       manager_cost: 7000.00,
       nivel: 3,
       quantity: 0,
       delay: 5000
     },
    {
       id: 4,
       name: "Cebola",
       image: "../img/cebola.png",
       sell_cost: 27.00,
       value_cost: 2100.00,
       manager_cost: 31000.00,
       nivel: 4,
       quantity: 0,
       delay: 7000
     },
    {
       id: 5,
       name: "Cogumelo",
       image: "../img/cogumelo.png",
       sell_cost: 74.00,
       value_cost: 8600.00,
       manager_cost: 53500.00,
       nivel: 5,
       quantity: 0,
       delay: 10000
     },
     {
       id: 6,
       name: "Pêra",
       image: "../img/pera.png",
       sell_cost: 104.00,
       value_cost: 14320.00,
       manager_cost: 85000.00,
       nivel: 6,
       quantity: 0,
       delay: 15000
     },
     {
       id: 7,
       name: "Cenoura",
       image: "../img/cenoura.png",
       sell_cost: 220.00,
       value_cost: 32000.00,
       manager_cost: 140000.00,
       nivel: 7,
       quantity: 0,
       delay: 20000
     },
     {
       id: 8,
       name: "Blueberry",
       image: "../img/blueberries.png",
       sell_cost: 440.00,
       value_cost: 53000.00,
       manager_cost: 1000000.00,
       nivel: 8,
       quantity: 0,
       delay: 30000
     },
  ];
  
  $scope.sellProduct = function(product, is_manager) {
    if (product.blocked) return;
    
    var verified_product = false;
    for(var i = 0; i < $scope.list_things.length; i++) {
      if ($scope.list_things[i].id == product.id) {
        verified_product = true;
        product = $scope.list_things[i];
      }
    }
    if (!verified_product) {
      alert('Produto nao encontrado');
      return;
    }
    
    var tenpercent = (10 * product.delay) / 100;
    var timerend = false;
    var timer = null;
    product.timer = 0;
    product.blocked = true;
    timer = $interval(function(){
      if (!timerend) {
        product.timer += tenpercent / 10;
        console.log(product.timer, tenpercent)
      }
    }, tenpercent - 20);
    
    if(!product.manager){
     $interval.cancel(product.manager_task);
     product.manager_task = null;
     $timeout(function() {
        product.delay--;
        $scope.you.money += product.sell_cost * product.quantity;
        $interval.cancel(timer);
        product.timer = 0;
        product.blocked = false;
      }, product.delay); 
    } else {
      if (!product.manager_task){
        product.manager_task = $interval(function(){
          product.delay = 0;
          $scope.you.money += product.sell_cost * product.quantity;
          $interval.cancel(timer);
          product.timer = 0;
          product.blocked = false;
        }, product.delay) 
      }
    }
    
  }
  
  $scope.buyQuantity = function(product) {
    if ($scope.you.money < product.value_cost){
      alert("Você não possui saldo o suficiente.")
      return;
    }
    
    var verified_product = false;
    for(var i = 0; i < $scope.list_things.length; i++) {
      if ($scope.list_things[i].id == product.id) {
        verified_product = true;
      }
    }
    if (!verified_product) {
      alert('Produto nao encontrado');
      return;
    }
    $scope.you.money -= product.value_cost;
    product.quantity++;
    product.sell_cost += (5 *   product.sell_cost / 100) // Aumentando valor em 5%
    product.value_cost += (6 *   product.value_cost / 100) //Aumentando valor em 6%
    
  };
  
  $interval(function(){
    if ($scope.you.nivel == 1 && $scope.you.money > 50.00) {
      $scope.you.nivel++;
    }
    else if ($scope.you.nivel == 2 && $scope.you.money > 500.00)     {
      $scope.you.nivel++;
    }
    else if ($scope.you.nivel == 3 && $scope.you.money > 4500.00)     {
      $scope.you.nivel++;
    }
    else if ($scope.you.nivel == 4 && $scope.you.money > 12000.00)     {
      $scope.you.nivel++;
    }
     else if ($scope.you.nivel == 5 && $scope.you.money > 20000.00)     {
      $scope.you.nivel++;
    }
  }, 500);
});