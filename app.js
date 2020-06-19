// ----------------- ДЭЛГЭЦТЭЙ ХАРИЛЦАХ ХЭСЭГ ----------------
var uiController = (function () {
  // HTML КЛАССУУДЫГ СОНГОХ ХЭСЭГ -private-
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };
  var nodeListForeach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  // Мөнгөн дүнг дэлгэцэн үзүүлэхдээ 3 оронгоор нь тасалж таслал тавих
  var formatMoney = function (too, type) {
    // тоог string болгох
    too = "" + too;

    // өгөгдөлийг нэг бүрчлэн хуваагаад урвуу байрлуулаад нэгтгэн массив болгох(123456789 ===> 987654321)
    var x = too.split("").reverse().join("");

    var y = "";
    var count = 1;
    // массивын индэкс 3т хуваагддаг тоо байх юм бол ард нь таслал залгах( 987,654,321,)
    for (var i = 0; i < x.length; i++) {
      y = y + x[i];

      if (count % 3 === 0) y = y + ",";
      count++;
    }
    // урвуу дараалалтай  өгөгдөлөө буцаагаад зөв дараалалтай болгох(,123,456,789)
    var z = y.split("").reverse().join("");

    //эхний таслалыг алга болгох(,123,456,789 ===> 123,456,789)
    if (z[0] === ",") z = z.substr(1, z.length - 1);

    //  орлого бол урд нь, зарлаг бол урд нь тэмдэг тавих
    if (type === "inc") z = "+ " + z;
    else z = "- " + z;

    return z;
  };

  // -------------PUBLIC SERVICE БУЮУ ГАДАГШАА ГАРГАХ ОБЕКТ -public-
  return {
    displayDates: function () {
      var unuudur = new Date();

      document.querySelector(DOMstrings.dateLabel).textContent =
        unuudur.getMonth() + "-р сарын өрхийн санхүү";
    },

    changeType: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputType +
          ", " +
          DOMstrings.inputDescription +
          ", " +
          DOMstrings.inputValue
      );

      nodeListForeach(fields, function (el) {
        el.classList.toggle("red-focus");
      });

      document.querySelector(DOMstrings.addBtn).classList.toggle("red");
    },

    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //exp or inc

        description: document.querySelector(DOMstrings.inputDescription).value,

        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    displayPercnetages: function (allPercentages) {
      // Зарлагын NOdeListийг олох
      var elements = document.querySelectorAll(
        DOMstrings.expensePercentageLabel
      );
      //Элемент болгоны хувьд зарлагын хувийг үзүүлэх
      nodeListForeach(elements, function (el, index) {
        el.textContent = allPercentages[index] + "%";
      });
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      // CONVERT LIST TO ARRAY
      var fieldArr = Array.prototype.slice.call(fields);

      fieldArr.forEach(function (el, index, array) {
        el.value = "";
      });

      fieldArr[0].focus();
    },

    tusviigUzuuleh: function (tusuv) {
      var type;
      if (tusuv.tusuv > 0) type = "inc";
      else type = "exp";

      document.querySelector(DOMstrings.budgetLabel).textContent = formatMoney(
        tusuv.tusuv,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(
        tusuv.totalInc,
        "inc"
      );
      document.querySelector(DOMstrings.expenseLabel).textContent = formatMoney(
        tusuv.totalExp,
        "exp"
      );
      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = " ";
      }
    },
    deleteListItem: function (id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },

    addListItem: function (item, type) {
      // 1. ОРЛОГО ЗАРЛАГЫН ЭЛЕМЕНТИЙГ АГУУЛСАН HTML-ИЙГ БЭЛТГЭНЭ
      var HTML, list;
      if (type === "inc") {
        (list = DOMstrings.incomeList),
          (html =
            '<div class="item clearfix" id="inc-%%id%%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">%%value%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>');
      } else {
        (list = DOMstrings.expenseList),
          (html =
            '<div class="item clearfix" id="exp-%%id%%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">%%value%%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>');
      }
      // 2. ТЭР HTML ДОТРОО ОРЛОГО ЗАРЛАГЫН УТГУУДЫГ  REPLACE АШИГЛАЖ ӨӨРЧИЛЖ ӨГНӨ
      html = html.replace("%%id%%", item.id);
      html = html.replace("%%DESCRIPTION%%", item.description);
      html = html.replace("%%value%%", formatMoney(item.value, type));

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
    this.percentage = -1;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  // expense байгуулагч функцийн prototype-руу calcPercentage функц нэмэх
  Expense.prototype.calcPersentage = function (totalInc) {
    if (totalInc > 0)
      this.percentage = Math.round((this.value / totalInc) * 100);
    else this.percentage = "";
  };

  // expense байгуулагч функцийн prototype-руу getPercentage функц нэмэх
  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
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

    tusuv: 0,

    huvi: 0,
  };

  //   ---------------- FINANCE PUBLIC SERVICE
  return {
    tusuvtootsoh: function () {
      // НИЙТ ОРЛОГЫН НИЙЛБЭРИЙГ ТООЦОХ
      calculateTotal("inc");

      // НИЙТ ЗАРЛАГЫН НИЙЛБЭРИЙГ ТООЦООХ
      calculateTotal("exp");

      // ТӨСВИЙГ ШИНЭЭР ТООЦОХ
      data.tusuv = data.totals.inc - data.totals.exp;

      // ОРЛОГО ЗАРЛАГЫГ ХУВЬЧЛАН ҮЗҮҮЛЭХ
      if (data.totals.inc > 0) {
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else data.huvi = "";
    },
    calculatePercentages: function () {
      data.items.exp.forEach(function (el) {
        el.calcPersentage(data.totals.inc);
      });
    },
    getPercentages: function () {
      var allPercentages = data.items.exp.map(function (el) {
        return el.getPercentage();
      });

      return allPercentages;
    },
    tusviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },
    deleteItem: function (type, id) {
      // IDг шүүж авах шинэ массив
      var ids = data.items[type].map(function (el) {
        return el.id;
      });
      // устгах IDний индэкс дугаар
      var index = ids.indexOf(id);

      // дугаарыг нь олоод ориг массиваас устгах
      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },
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
    // 1. ОРУУЛАХ ӨГӨГДЛИЙГ ДЭЛГЭЦЭЭС ОЛЖ АВНА.
    var input = uiController.getInput();
    if (input.description !== "" && input.value !== "") {
      // 2. ОЛЖ АВСАН ӨГӨГДӨЛҮҮДЭЭ САНХҮҮГИЙН МОДУЛЬ  ХАДГАЛНА.
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );

      // 3. ОЛЖ АВСАН ӨГӨГЛӨЛҮҮДЭЭ ВЭБ ДЭЭРЭЭ ТОХИРОХ ХЭСЭГТ НЬ ГАРГАНА.
      uiController.addListItem(item, input.type);
      uiController.clearFields();

      // ТӨСВИЙГ ШИНЭЭР ТООЦООЛОН ДЭЛГЭЦЭНД ҮЗҮҮЛЭХ
      updateTusuv();
    }
  };

  var updateTusuv = function () {
    // 4. ТӨСВИЙГ ТООЦООЛНО.
    financeController.tusuvtootsoh();

    // 5. ЭЦСИЙН ҮЛДЭГДЭЛ
    var tusuv = financeController.tusviigAvah();

    // 6.  ТООЦООГ ДЭЛГЭЦЭНД ГАРГАНА.
    uiController.tusviigUzuuleh(tusuv);

    // 7. ЭЛЕМЕНТҮҮДИЙН ХУВИЙГ ТООЦООЛНО
    financeController.calculatePercentages();

    // 8. ЭЛЕМЕНТҮҮДИЙН ХУВИЙГ ХҮЛЭЭЖ АВНА
    var allPercentages = financeController.getPercentages();

    // 9. ЭЛЕМЕНТҮҮДИЙН ХУВИЙГ ДЭЛГЭЦЭНД ГАРГАНА
    uiController.displayPercnetages(allPercentages);
  };

  //   EVENT LISTENER БУЮУ ТОВЧЛУУР ХАРИУЦСАН ХОЛБОГЧ ФУНКЦ

  var setupEventListener = function () {
    // HTML КЛАССУУДЫГ СОНГОХ ХЭСЭГ
    var DOM = uiController.getDOMstrings();

    // MOUSE CLICK
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    // ENTER
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) ctrlAddItem();
    });

    document
      .querySelector(DOM.inputType)
      .addEventListener("change", uiController.changeType);
    // DELETE BTN
    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemID = parseInt(arr[1]);
        }
        // 1. санхүүгийн модулиас  ашиглан устах
        financeController.deleteItem(type, itemID);

        // 2. дэлгэцээс устгах
        uiController.deleteListItem(id);

        // 3. ТӨСВИЙГ ШИНЭЭР ТООЦООЛОН ДЭЛГЭЦЭНД ҮЗҮҮЛЭХ
        updateTusuv();
      });
  };
  // ПРОГРАММЫГ ЭХЛҮҮЛЭХ, ИДВЭХЖҮҮЛЭХ
  return {
    init: function () {
      uiController.displayDates();
      uiController.tusviigUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0,
      });
      setupEventListener();
    },
  };
})(uiController, financeController);

appController.init();
