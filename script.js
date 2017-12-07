var myApp = angular.module('DemoApp', ['firebase']);

myApp.constant("FIREBASE_URL", "https://demotodo.firebaseio.com/" );

myApp.controller('DemoCtrl', ['$scope','$firebase','FIREBASE_URL',function($scope, $firebase, FIREBASE_URL) {

    // Get Stored TODOs
    var todosRef = new Firebase(FIREBASE_URL);
    $scope.todos = $firebase(todosRef);
		$scope.test = "Test works!";
  
  	$scope.getCount = function () {
			var count = 0;
			todosRef.once('value', function(dataSnapshot) {
				count = dataSnapshot.numChildren();
			});
      return count;
    }
  	

    // Update the "completed" status
    $scope.changeStatus   = function (item) {

        // Get the Firebase reference of the item
        var itemRef = new  Firebase(FIREBASE_URL + item.id);

        // Firebase : Update the item
        $firebase(itemRef).$set({
            id: item.id,
            name : item.name,
            completed: !item.completed
        });

    }



    // Remove a Todo
    $scope.removeItem   = function (index, item, event) {

       // Avoid wrong removing
       if (item.id == undefined)return;

       // Firebase: Remove item from the list
       $scope.todos.$remove(item.id);

    }



    // Add new TODO
    $scope.addItem  = function () {

        // Create a unique ID
        var timestamp = new Date().valueOf()

        // Get the Firebase reference of the item
        var itemRef = new Firebase(FIREBASE_URL + timestamp);

        $firebase(itemRef).$set({
            id: timestamp,
            name : $scope.todoName,
            completed: false
        });

        $scope.todoName = "";

    }

}]);
