angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('BLECtrl', function($scope, BLE) {
  var deviceID = '20:C3:8F:F6:88:11';

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

.controller('BLEDetailCtrl', function($scope, $stateParams, BLE) {
  var deviceId  = $stateParams.deviceId
  console.log(deviceId);

  var success = function () {
    console.log("sent!");
  };

  var failure = function (error) {
      alert(error);
  };

  BLE.connect(deviceId).then(
      function(peripheral) {
          $scope.device = peripheral;
          console.log("connected");
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

      ble.writeWithoutResponse(deviceId, "FFE0", "FFE1", stringToBytes("1"), success, failure);
      console.log("pressed");
  };

  $scope.turnOff = function() {
      console.log("call turn on");
      var data = new ArrayBuffer(1);
      data[0] = 0x31;

      ble.writeWithoutResponse(deviceId, "FFE0", "FFE1", stringToBytes("0"), success, failure);
      console.log("pressed");
  };

  $scope.blink = function() {
      console.log("call turn on");
      var data = new ArrayBuffer(1);
      data[0] = 0x31;

      ble.writeWithoutResponse(deviceId, "FFE0", "FFE1", stringToBytes("2"), success, failure);
      console.log("pressed");
  };
});
