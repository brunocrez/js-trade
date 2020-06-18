"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TradeList = function () {
    function TradeList() {
        _classCallCheck(this, TradeList);

        this._list = [];
    }

    _createClass(TradeList, [{
        key: "addToList",
        value: function addToList(trade) {
            this._list.push(trade);
        }
    }, {
        key: "clearList",
        value: function clearList() {
            this._list = [];
        }
    }, {
        key: "list",
        get: function get() {
            return [].concat(this._list);
        }
    }]);

    return TradeList;
}();
//# sourceMappingURL=TradeList.js.map