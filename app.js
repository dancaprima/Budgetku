//Budget Controller
var budgetController = (function(){

     
})();

//UI Controller
var UIController = (function(){



})();

//Global Controller
var controller = (function(budgetCtrl, UICtrl){

    var ctrlAdditem = function(){
        //1.Get Input Data
        //2.Add the item to the budget controller
        //3.Add the items to the UI
        //4.Calculate the budget
        //5.Display the budget on the UI
        
    }

    document.querySelector('.add__btn').addEventListener('click',ctrlAdditem);

    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAdditem();
        }
    });

})(budgetController, UIController);