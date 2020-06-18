'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, database_stores, database_version, database_name, connection, closeConnection, ConnectionFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            database_stores = ['trades'];
            database_version = 1;
            database_name = 'trade_system';
            connection = null;
            closeConnection = null;

            _export('ConnectionFactory', ConnectionFactory = function () {
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw new Error('Connection Factory cannot be instantiated!');
                }

                _createClass(ConnectionFactory, null, [{
                    key: 'getConn',
                    value: function getConn() {
                        return new Promise(function (resolve, reject) {

                            var openRequest = window.indexedDB.open(database_name, database_version);

                            openRequest.onupgradeneeded = function (event) {
                                ConnectionFactory._createStore(event.target.result);
                            };

                            openRequest.onsuccess = function (event) {
                                if (!connection) {
                                    connection = event.target.result;
                                    closeConnection = connection.close.bind(connection);
                                    connection.close = function () {
                                        throw new Error('Cannot close connection!');
                                    };
                                }

                                resolve(connection);
                            };

                            openRequest.onerror = function (event) {
                                console.log(event.target.error);
                                reject(event.target.error.name);
                            };
                        });
                    }
                }, {
                    key: '_createStore',
                    value: function _createStore(conn) {
                        database_stores.forEach(function (item) {
                            if (conn.objectStoreNames.contains(item)) {
                                conn.deleteObjectStore(item);
                            }

                            conn.createObjectStore(item, { autoIncrement: true });
                        });
                    }
                }, {
                    key: 'closeConn',
                    value: function closeConn() {
                        if (connection) {
                            closeConnection();
                        }
                    }
                }]);

                return ConnectionFactory;
            }());

            _export('ConnectionFactory', ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map