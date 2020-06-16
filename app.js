// ----------------- ДЭЛГЭЦТЭЙ ХАРИЛЦАХ ХЭСЭГ
var uiController = (function () {})();

// ----------------- САНХҮҮТЭЙ ХАРИЛЦАХ ХЭСЭГ
var financeController = (function () {})();

// ----------------- ПРОГРАММЫН ХОЛБОГЧ ХЭСЭГ
var appController = (function () {
  var ctrlAddItem = function () {
    alert("clicked");

    // 1. ОРУУЛАХ ӨГӨГДӨРЛИЙГ ДЭЛГЭЦЭЭС ОЛЖ АВНА.
    // 2. ОЛЖ АВСАН ӨГӨГДӨЛҮҮДЭЭ САНХҮҮГИЙН МОДУЛЬ  ХАДГАЛНА.
    // 3. ОЛЖ АВСАН ӨГӨГЛӨЛҮҮДЭЭ ВЭБ ДЭЭРЭЭ ТОХИРОХ ХЭСЭГТ НЬ ГАРГАНА.
    // 4. ТӨСВИЙГ ТООЦООЛНО.
    // 5. ЭЦСИЙН ҮЛДЭГДЭЛ, ТООЦООГ ДЭЛГЭЦЭНД ГАРГАНА.
  };
  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) ctrlAddItem();
  });
})(uiController, financeController);
