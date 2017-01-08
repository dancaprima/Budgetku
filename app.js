//Budget Controller
var budgetController = (function () {})();

//UI Controller
var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }
    return {
        getinput: function () {

            return {
                type: document
                    .querySelector(DOMStrings.inputType)
                    .value,
                description: document
                    .querySelector(DOMStrings.inputDescription)
                    .value,
                value: document
                    .querySelector(DOMStrings.inputValue)
                    .value
            }
        },
        getDOMStrings: function () {
            return DOMStrings;
        }

    }

})();

//Global Controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        document
            .querySelector(DOM.inputBtn)
            .addEventListener('click', ctrlAdditem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAdditem();
            }
        });

    }

    var DOM = UICtrl.getDOMStrings();

    var ctrlAdditem = function () {
        //1.Get Input Data
        var input = UICtrl.getinput();
        console.log(input)
        // 2.Add the item to the budget controller 3.Add the items to the UI 4.Calculate
        // the budget 5.Display the budget on the UI

    }

})(budgetController, UIController);