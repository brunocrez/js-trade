var ConnectionFactory = (function() {

    var database_stores = ['trades'];
    var database_version = 1;
    var database_name = 'trade_system';
    var connection = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error('Connection Factory cannot be instantiated!');
        }

        static getConn() {
            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(database_name, database_version);

                openRequest.onupgradeneeded = event => {
                    ConnectionFactory._createStore(event.target.result);
                };

                openRequest.onsuccess = event => {
                    if (!connection) {
                        connection = event.target.result;
                    }

                    resolve(connection);
                };

                openRequest.onerror = event => {
                    console.log(event.target.error);
                    reject(event.target.error.name);
                };
            });
        }

        static _createStore(conn) {
            database_stores.forEach(item => {
                if (conn.objectStoreNames.contains(item)) {
                    conn.deleteObjectStore(item);
                }

                conn.createObjectStore(item, { autoIncrement: true });
            });
        }
    }
})();