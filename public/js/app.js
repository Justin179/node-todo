angular.module('TestApp',[]);

angular.module('TestApp').controller('MainController',ctrlFunc);

function ctrlFunc(){
    // THIS REFERS TO THE MainController as vm

    this.people = clientPeople;

}