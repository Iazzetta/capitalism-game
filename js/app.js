angular.module('adMoney', ['ngMaterial'])
.controller('main', function($scope, $timeout, $interval) {
  
  $scope.you = {
    id: 1,
    name: "",
    money: 350.00,
    nivel: 1,
    truck: 1,
    truck_max: 200,
    truck_price: 100000.00
  };

  // Select theme
  $scope.list_things = tm_cannabis; //tm_cannabis, tm_fruit
  $scope.css_selected = 'cannabis'; // fruit, cannabis, etc.
  
  var list_things = JSON.parse(localStorage.getItem("list_things"));
  var you = JSON.parse(localStorage.getItem("you"));
  
  if(you){
    $scope.you = you;
  }
  if(list_things) {
    $scope.list_things = list_things;
  }
  
  $scope.ativateManager = function(product){
    if(product.manager){
      if(!product.manager_bought) {
        $scope.you.money -= product.manager_cost;
        product.manager_bought = true;
      }
      $scope.sellProduct(product);
    }
  }
  
  $scope.sellProduct = function(product) {
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
    
    var timer = null;
    product.timer = angular.copy(product.delay / 1000);
    product.blocked = true;
    timer = $interval(function(){
      if (product.timer > 0) {
        product.timer--;
      }
    }, 1000);
    
    if(!product.manager){
      product.manager_task_active = false;
      $interval.cancel(product.manager_task);
      $timeout(function() {
        $scope.you.money += product.sell_cost * product.quantity;
        $interval.cancel(timer);
        product.timer = 0;
        product.blocked = false;
      }, product.delay); 
    } else {
      // Se tem manager on e nao tem task nenhuma, cria.
      if (!product.manager_task_active && product.manager){
        product.manager_task_active = true;
        product.manager_task = $interval(function(){
          $scope.you.money += product.sell_cost * product.quantity;
          $interval.cancel(timer);
          product.timer = 0;
          product.blocked = false;
        }, product.delay);
        console.log("Criamos manager interval.")
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
    
    if (($scope.you.truck + 1) <= $scope.you.truck_max){
      $scope.you.truck++;
    } else {
      alert("Seu caminhão está cheio! Faça o upgrade para armazenar mais produtos.")
      return;
    }
    
    $scope.you.money -= product.value_cost;
    product.quantity++;
    product.sell_cost += (product.percentage_gain *   product.sell_cost / 100) // Aumentando valor em 5%
    product.value_cost += (product.percentage_cost *   product.value_cost / 100) //Aumentando valor em 6%
    
  };
  
  $scope.upgradeTruck = function(){
    if (confirm("Voce deseja fazer upgrade do caminhao para +200 produtos por R$ " + $scope.you.truck_price + " ?")) {
      if ($scope.you.money >= $scope.you.truck_price){
        $scope.you.money -= $scope.you.truck_price;
        $scope.you.truck_max += 200;
        $scope.you.truck_price += ($scope.you.truck_price * 10)
      } else {
        alert("Você não tem saldo para fazer upgrade do caminhão.");
        return;
      }
    }
  }
  
  $interval(function(){
    for (var i = 0; i < $scope.list_things.length; i++) {
      var product = $scope.list_things[i];
      if ($scope.you.money >= product.manager_cost && !product.enabled){
        product.enabled = true;
      }
    }
    
    localStorage.setItem("list_things", JSON.stringify($scope.list_things));
    localStorage.setItem("you", JSON.stringify($scope.you));
  }, 500);
  
  $timeout(function(){
    if(!$scope.you.name){
      $scope.you.name = prompt("Digite seu nome: ", "Guilherme");
    }
  }, 2000)
  window.onbeforeunload = function(){
    return 'Se você sair, você perderá seu progresso.';
  };
});