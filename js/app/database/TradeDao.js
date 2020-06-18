'use strict';

System.register(['../models/Trade'], function (_export, _context) {
    "use strict";

    var Trade, _createClass, TradeDao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsTrade) {
            Trade = _modelsTrade.Trade;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('TradeDao', TradeDao = function () {
                function TradeDao(conn) {
                    _classCallCheck(this, TradeDao);

                    this._conn = conn;
                    this._store = 'trades';
                }

                _createClass(TradeDao, [{
                    key: 'save',
                    value: function save(trade) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            var req = _this._conn.transaction([_this._store], 'readwrite').objectStore(_this._store).add(trade);

                            req.onsuccess = function (event) {
                                resolve();
                            };

                            req.onerror = function (event) {
                                console.log(event.target.error);
                                reject('Something went wrong while trying to add new object!');
                            };
                        });
                    }
                }, {
                    key: 'listAll',
                    value: function listAll() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            var cursor = _this2._conn.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

                            var tradeList = [];

                            cursor.onsuccess = function (event) {
                                var current = event.target.result;
                                if (current) {
                                    var data = current.value;
                                    tradeList.push(new Trade(data._date, data._quantity, data._value));
                                    current.continue();
                                } else {
                                    resolve(tradeList);
                                }
                            };

                            cursor.onerror = function (event) {
                                console.log(event.target.error);
                                reject('Something went wrong trying to list trades!');
                            };
                        });
                    }
                }, {
                    key: 'clearAll',
                    value: function clearAll() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            var cursor = _this3._conn.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                            cursor.onsuccess = function (event) {
                                resolve('Database Cleared Successfully!');
                            };

                            cursor.onerror = function (event) {
                                console.log(event.target.error);
                                reject('Something went wrong trying to clear Database!');
                            };
                        });
                    }
                }]);

                return TradeDao;
            }());

            _export('TradeDao', TradeDao);
        }
    };
});
//# sourceMappingURL=TradeDao.js.map