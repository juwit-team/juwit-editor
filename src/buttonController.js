'use strict';
angular.module("textAngularTest").controller('ButtonController', function() {
    alert('TEST');
    this.popup = function(content) {
        alert(content);
    };
});
