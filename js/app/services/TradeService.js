'use strict';

System.register(['../models/Trade', '../database/TradeDao', '../services/HttpService', '../services/ConnectionFactory'], function (_export, _context) {
    "use strict";

    var Trade, TradeDao, HttpService, ConnectionFactory, _createClass, TradeService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsTrade) {
            Trade = _modelsTrade.Trade;
        }, function (_databaseTradeDao) {
            TradeDao = _databaseTradeDao.TradeDao;
        }, function (_servicesHttpService) {
            HttpService = _servicesHttpService.HttpService;
        }, function (_servicesConnectionFactory) {
            ConnectionFactory = _servicesConnectionFactory.ConnectionFactory;
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

            _export('TradeService', TradeService = function () {
                function TradeService() {
                    _classCallCheck(this, TradeService);

                    this._http = new HttpService();
                }

                _createClass(TradeService, [{
                    key: 'getTradesOnWeek',
                    value: function getTradesOnWeek() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            _this._http.get('http://localhost:3000/week').then(function (trades) {
                                resolve(trades.map(function (item) {
                                    return new Trade(new Date(item.date), item.quantity, item.value);
                                }));
                            }).catch(function (err) {
                                console.log(err);
                                reject('Error: Cannot GET trades from this week!');
                            });
                        });
                    }
                }, {
                    key: 'getTradesOnLastWeek',
                    value: function getTradesOnLastWeek() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            _this2._http.get('http://localhost:3000/lastweek').then(function (trades) {
                                resolve(trades.map(function (item) {
                                    return new Trade(new Date(item.date), item.quantity, item.value);
                                }));
                            }).catch(function (err) {
                                console.log(err);
                                reject('Error: Cannot GET trades from last week!');
                            });
                        });
                    }
                }, {
                    key: 'getTradesOnLastFourteenDays',
                    value: function getTradesOnLastFourteenDays() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            _this3._http.get('http://localhost:3000/twoweeksago').then(function (trades) {
                                resolve(trades.map(function (item) {
                                    return new Trade(new Date(item.date), item.quantity, item.value);
                                }));
                            }).catch(function (err) {
                                console.log(err);
                                reject('Error: Cannot GET trades from two weeks ago!');
                            });
                        });
                    }
                }, {
                    key: 'getAllTrades',
                    value: function getAllTrades() {
                        return Promise.all([this.getTradesOnWeek(), this.getTradesOnLastWeek(), this.getTradesOnLastFourteenDays()]).then(function (array) {
                            var flatArray = array.reduce(function (newArr, arr) {
                                return newArr.concat(arr);
                            }, []);

                            return flatArray;
                        }).catch(function (err) {
                            throw new Error(err);
                        });
                    }
                }, {
                    key: 'addTrade',
                    value: function addTrade(trade) {
                        return ConnectionFactory.getConn().then(function (conn) {
                            return new TradeDao(conn);
                        }).then(function (obj) {
                            return obj.save(trade);
                        }).then(function () {
                            return 'Trade Added Successfully!';
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Something went wrong trying to create new Trade!');
                        });
                    }
                }, {
                    key: 'listAllTrades',
                    value: function listAllTrades() {
                        return ConnectionFactory.getConn().then(function (conn) {
                            return new TradeDao(conn);
                        }).then(function (obj) {
                            return obj.listAll();
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Something went wrong trying to list Trades!');
                        });
                    }
                }, {
                    key: 'clearAllTrades',
                    value: function clearAllTrades() {
                        return ConnectionFactory.getConn().then(function (conn) {
                            return new TradeDao(conn);
                        }).then(function (obj) {
                            return obj.clearAll();
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Something went wrong trying to clear Trades!');
                        });
                    }
                }, {
                    key: 'importTrades',
                    value: function importTrades(currentList) {
                        return this.getAllTrades().then(function (tradeList) {
                            return tradeList.filter(function (item) {
                                return !currentList.some(function (existingItem) {
                                    return JSON.stringify(existingItem) == JSON.stringify(item);
                                });
                            });
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Something went wrong trying to import Trades!');
                        });
                    }
                }]);

                return TradeService;
            }());

            _export('TradeService', TradeService);
        }
    };
});
//# sourceMappingURL=TradeService.js.map