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
    var calculateTotal = function (type) {
              var sum = 0;
        data
            .allItems[type]
            .forEach(function (curr) {
          
                sum += curr.value
            })

        data.totals[type] = sum;
    }

    var data = {
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: [],
            income: []
        },
        budget: 0,
        percentage: -1
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

        calculateBudget: function () {
            calculateTotal('expense');
            calculateTotal('income');

            data.budget = data.totals.income - data.totals.expense;
            if(data.totals.income > 0){
            data.percentage = Math.round((data.totals.expense / data.totals.income) * 100)
            }else{
                data.percentage = -1
            }
        },
        getBudget: function () {
            return {budget: data.budget, totalIncome: data.totals.income, totalExpense: data.totals.expense, percentage: data.percentage}
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
        expenseContainer: '.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel : '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    };
    return {
        getinput: function () {

            return {
                type: document
                    .querySelector(DOMStrings.inputType)
                    .value,
                description: document
                    .querySelector(DOMStrings.inputDescription)
                    .value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },
        addListItem: function (obj, type) {
            var html,
                newHtml,
                element;
            if (type === 'income') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc' +
                        'ription%</div><div class="right clearfix"> <div class="item__value">+ %value%</d' +
                        'iv><div class="item__delete"> <button class="item__delete--btn"><i class="ion-io' +
                        's-close-outline"></i></button></div></div></div>';
            } else if (type === 'expense') {
                element = DOMStrings.expenseContainer
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%des' +
                        'cription%</div><div class="right clearfix"><div class="item__value">- %value%</d' +
                        'iv><div class="item__percentage">21%</div><div class="item__delete"><button clas' +
                        's="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>' +
                        '</div>'
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document
                .querySelector(element)
                .insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function () {
            var fields,
                fieldsArr;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            fieldsArr = Array
                .prototype
                .slice
                .call(fields);
            fieldsArr.forEach(function (cur, index, array) {
                cur.value = '';

            })
            fieldsArr[0].focus();

        },
        displayBudget: function(obj){
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalIncome;
            document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExpense;
            document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage;
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

    var updateBudget = function () {
        //.4.Calculate the budget
        budgetCtrl.calculateBudget();
        //  5.Display the budget on the UI
        var budget = budgetCtrl.getBudget();

        UICtrl.displayBudget(budget)
    }

    var ctrlAdditem = function () {
        var input,
            newItem;
        //1.Get Input Data
        input = UICtrl.getinput();
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2.Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3.Add the items to the UI
            UICtrl.addListItem(newItem, input.type);

            UICtrl.clearFields();
            

            updateBudget();
        }
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