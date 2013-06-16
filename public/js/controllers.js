'use strict';

/* Controllers */

function AppCtrl($scope, socket) {
  console.log('socket', socket)
  socket.on('send:name', function (data) {
    $scope.name = data.name;
  });

  socket.on('new visitor', function() {
  	console.log('new v');
  })

  socket.on('got data', function() {
  	console.log('xxx v', arguments);
  })
}

function RfidCtrl ($scope, socket) {
	socket.on('receive:rfidTag', function(data) {
		console.log('got', data);
		$scope.tagId = data.tagId;
		// $scope.$apply();
	})
	
}
function MyCtrl1($scope, socket) {
  socket.on('send:time', function (data) {
    $scope.time = data.time;
  });
}
MyCtrl1.$inject = ['$scope', 'socket'];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
