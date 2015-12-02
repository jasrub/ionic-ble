angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('HomeCtrl', function($scope) {})

.controller('BLECtrl', function($scope, BLE) {

  // keep a reference since devices will be added
  $scope.devices = BLE.devices;


  var success = function () {
      if ($scope.devices.length < 1) {
          // a better solution would be to update a status message rather than an alert
          alert("Didn't find any Bluetooth Low Energy devices.");
      }
  };

  var failure = function (error) {
      alert(error);
  };

  // pull to refresh
  $scope.onRefresh = function() {
      BLE.scan().then(
          success, failure
      ).finally(
          function() {
              $scope.$broadcast('scroll.refreshComplete');
          }
      )
  }

  // initial scan
  BLE.scan().then(success, failure);

})

.controller('BLEDetailCtrl', function($scope, $stateParams, BLE, $interval) {
  $scope.deviceId  = $stateParams.deviceId
  $scope.myColor = 'white';

  console.log($scope.deviceId);

  var success = function () {
    console.log("sent!");
  };

  var failure = function (error) {
      alert(error);
  };

  BLE.connect($scope.deviceId).then(
      function(peripheral) {
          $scope.device = peripheral;
          console.log("connected");
          ble.startNotification($scope.deviceId, "FFE0", "FFE1", onData, failure);
      }
  );

   function stringToBytes(string) {
        var array = new Uint8Array(string.length);
        for (var i = 0, l = string.length; i < l; i++) {
       array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  //Send 1 to turn led on
  $scope.turnOn = function() {
      console.log("call turn on");
      var data = new ArrayBuffer(1);
      data[0] = 0x31;

      ble.writeWithoutResponse($scope.deviceId, "FFE0", "FFE1", stringToBytes("1"), success, failure);
      console.log("pressed");
  };

  $scope.turnOff = function() {
      console.log("call turn on");
      var data = new ArrayBuffer(1);
      data[0] = 0x31;

      ble.writeWithoutResponse($scope.deviceId, "FFE0", "FFE1", stringToBytes("0"), success, failure);
      console.log("pressed");
  };

  $scope.blink = function() {
      console.log("call turn on");
      var data = new ArrayBuffer(1);
      data[0] = 0x31;

      ble.writeWithoutResponse($scope.deviceId, "FFE0", "FFE1", stringToBytes("2"), success, failure);
      console.log("pressed");
  };

  var done  = false;

 var successRead = function () {
    done  = true;
  };

  var onData = function(buffer) {
    // Decode the ArrayBuffer into a typed Array based on the data you expect
    var readData = new Uint8Array(buffer);
    $scope.isPressed = readData[0];
    if ($scope.isPressed=='0') {
      $scope.myColor = 'white';
    }
    else {
      $scope.myColor = 'red';
    }
    $scope.$digest();
}

});
