'use strict';

System.register(['./controllers/TradeController'], function (_export, _context) {
  "use strict";

  var TradeController, tradeController;
  return {
    setters: [function (_controllersTradeController) {
      TradeController = _controllersTradeController.TradeController;
    }],
    execute: function () {
      tradeController = new TradeController();


      document.querySelector('.form').onsubmit = tradeController.addTrade.bind(tradeController);
      document.querySelector('#clearButton').onclick = tradeController.clearTrades.bind(tradeController);
    }
  };
});
//# sourceMappingURL=boot.js.map