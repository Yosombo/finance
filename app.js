// ----------------- ДЭЛГЭЦТЭЙ ХАРИЛЦАХ ХЭСЭГ
var uiController = (function () {
  // HTML КЛАССУУДЫГ СОНГОХ ХЭСЭГ privet
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  // ПАБЛИК СЭРВИС БУЮУ ГАДАГШАА ГАРГАХ ОБЕКТ public
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// ----------------- САНХҮҮТЭЙ ХАРИЛЦАХ ХЭСЭГ
var financeController = (function () {
  // ОРЛОГО ЗАРЛАГЫГ ХАДГАЛАХ ОБЕКТ
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;

    var data = {
      allitems: {
        inc: [],
        exp: [],
      },

      totals: {
        inc: 0,
        exp: 0,
      },
    };
  };
})();

// ----------------- ПРОГРАММЫН ХОЛБОГЧ ХЭСЭГ
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. ОРУУЛАХ ӨГӨГДӨРЛИЙГ ДЭЛГЭЦЭЭС ОЛЖ АВНА.
    console.log(uiController.getInput());
    // 2. ОЛЖ АВСАН ӨГӨГДӨЛҮҮДЭЭ САНХҮҮГИЙН МОДУЛЬ  ХАДГАЛНА.
    // 3. ОЛЖ АВСАН ӨГӨГЛӨЛҮҮДЭЭ ВЭБ ДЭЭРЭЭ ТОХИРОХ ХЭСЭГТ НЬ ГАРГАНА.
    // 4. ТӨСВИЙГ ТООЦООЛНО.
    // 5. ЭЦСИЙН ҮЛДЭГДЭЛ, ТООЦООГ ДЭЛГЭЦЭНД ГАРГАНА.
  };

  //   ЭВЭНТ ЛИСТЭНЭР БУЮУ ТОВЧЛУУР ХАРИУЦСАН ХОЛБОГЧ ФУНКЦ
  var setupEventListener = function () {
    // HTML КЛАССУУДЫГ СОНГОХ ХЭСЭГ
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) ctrlAddItem();
    });
  };
  // ПРОГРАММЫГ ЭХЛҮҮЛЭХ, ИДВЭХЖҮҮЛЭХ
  return {
    init: function () {
      setupEventListener();
    },
  };
})(uiController, financeController);

appController.init();
