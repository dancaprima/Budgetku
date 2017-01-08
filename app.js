//Budget Controller
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: [],
            incomee: []
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem,
                id;

            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            if (type === 'expense') {
                newItem = new Expense(id, des, val)
            } else if (type === 'income') {
                newItem = new Income(id, des, val)
            }

            data
                .allItems[type]
                .push(newItem);
            return newItem
        },

        testing: function () {
            console.log(data);
        }
    }
})();

//UI Controller
var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
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
        addListItem: function (obj, type) {
            var html, newHtml, element;
            if (type === 'income'){
                element = DOMStrings.incomeContainer;
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">+ %value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'expense'){
                element = DOMStrings.expenseContainer
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },
        getDOMStrings: function () {
            return DOMStrings;
        }

    }

})();

//Global Controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();

        document
            .querySelector(DOM.inputBtn)
            .addEventListener('click', ctrlAdditem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAdditem();
            }
        });

    }

    var ctrlAdditem = function () {
        var input,
            newItem;
        //1.Get Input Data
        input = UICtrl.getinput();

        // 2.Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3.Add the items to the UI 
        UICtrl.addListItem(newItem, input.type);
        //.4.Calculate the budget 5.Display the budget on the
        // UI

    }

    return {
        init: function () {
            console.log('Application has started');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

//initialize and running all code inside an IIFE
controller.init();