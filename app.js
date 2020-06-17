// ----------------- ДЭЛГЭЦТЭЙ ХАРИЛЦАХ ХЭСЭГ ----------------
var uiController = (function () {
  // HTML КЛАССУУДЫГ СОНГОХ ХЭСЭГ -private-
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  // ПАБЛИК СЭРВИС БУЮУ ГАДАГШАА ГАРГАХ ОБЕКТ -public-
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //exp or inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },

    addListItem: function (item, type) {
      // 1. ОРЛОГО ЗАРЛАГЫН ЭЛЕМЕНТИЙГ АГУУЛСАН HTML-ИЙГ БЭЛТГЭНЭ
      var HTML, list;
      if (type === "inc") {
        (list = ".income__list"),
          (html =
            '<div class="item clearfix" id="income-%%id%%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">%%value%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>');
      } else {
        (list = ".expenses__list"),
          (html =
            '<div class="item clearfix" id="expense-%%id%%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">%%value%%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>');
      }
      // 2. ТЭР HTML ДОТРОО ОРЛОГО ЗАРЛАГЫН УТГУУДЫГ  REPLACE АШИГЛАЖ ӨӨРЧИЛЖ ӨГНӨ
      html = html.replace("%%id%%", item.id);
      html = html.replace("%%DESCRIPTION%%", item.description);
      html = html.replace("%%value%%", item.value);

      // БЭЛТГЭСЭН HTML-ЭЭ DOM-РУУ ХИЙЖ ӨГНӨ
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
  };
})();

// ----------------- САНХҮҮТЭЙ ХАРИЛЦАХ ХЭСЭГ ----------------
var financeController = (function () {
  // ОРЛОГО ЗАРЛАГЫГ ХАДГАЛАХ ОБЕКТ -private-
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var data = {
    items: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };

  //   PUBLIC SERVICE -public-
  return {
    addItem: function (type, desc, val) {
      var item, id;
      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }
      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        //type = exp
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);

      return item;
    },
    seeData: function () {
      return data;
    },
  };
})();

// ----------------- ПРОГРАММЫН ХОЛБОГЧ ХЭСЭГ ----------------
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. ОРУУЛАХ ӨГӨГДӨРЛИЙГ ДЭЛГЭЦЭЭС ОЛЖ АВНА.
    var input = uiController.getInput();

    // 2. ОЛЖ АВСАН ӨГӨГДӨЛҮҮДЭЭ САНХҮҮГИЙН МОДУЛЬ  ХАДГАЛНА.
    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );

    // 3. ОЛЖ АВСАН ӨГӨГЛӨЛҮҮДЭЭ ВЭБ ДЭЭРЭЭ ТОХИРОХ ХЭСЭГТ НЬ ГАРГАНА.
    uiController.addListItem(item, input.type);

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
