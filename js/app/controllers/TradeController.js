'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TradeController = function () {
    function TradeController() {
        _classCallCheck(this, TradeController);

        var $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputQuantity = $('#quantity');
        this._inputValue = $('#value');

        this._tradeView = new TradeView($('#tradeView'));
        this._tradeList = new Bind(new TradeList(), this._tradeView, 'addToList', 'clearList');

        this._messageView = new MessageView($('#messageView'));
        this._message = new Bind(new Message(), this._messageView, 'message');

        this._tradeService = new TradeService();
        this._init();
    }

    _createClass(TradeController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this._tradeService.listAllTrades().then(function (tradeList) {
                return tradeList.forEach(function (trade) {
                    return _this._tradeList.addToList(trade);
                });
            }).catch(function (err) {
                return _this._message.message = err;
            });

            setInterval(function () {
                _this.importTrades();
            }, 5000);
        }
    }, {
        key: 'addTrade',
        value: function addTrade(event) {
            var _this2 = this;

            event.preventDefault();
            var newTrade = this._createTradeObject();

            this._tradeService.addTrade(newTrade).then(function (message) {
                _this2._tradeList.addToList(newTrade);
                _this2._message.message = message;
                _this2._resetForm();
            }).catch(function (err) {
                return _this2._message.message = err;
            });
        }
    }, {
        key: 'importTrades',
        value: function importTrades() {
            var _this3 = this;

            this._tradeService.importTrades(this._tradeList.list).then(function (trades) {
                return trades.forEach(function (trade) {
                    _this3._tradeList.addToList(trade);
                    _this3._message.message = 'Items Imported Successfully!';
                });
            }).catch(function (err) {
                return _this3._message.message = err;
            });
        }
    }, {
        key: 'clearTrades',
        value: function clearTrades() {
            var _this4 = this;

            this._tradeService.clearAllTrades().then(function (message) {
                _this4._message.message = message;
                _this4._tradeList.clearList();
            }).catch(function (message) {
                return _this4._message.message = message;
            });
        }
    }, {
        key: '_createTradeObject',
        value: function _createTradeObject() {
            return new Trade(DateHelper.stringToDate(this._inputDate.value), parseInt(this._inputQuantity.value), parseFloat(this._inputValue.value));
        }
    }, {
        key: '_resetForm',
        value: function _resetForm() {
            this._inputDate.value = '';
            this._inputQuantity.value = 1;
            this._inputValue.value = 0.0;

            this._inputDate.focus();
        }
    }]);

    return TradeController;
}();
//# sourceMappingURL=TradeController.js.map