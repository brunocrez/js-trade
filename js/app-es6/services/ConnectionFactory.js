const database_stores = ['trades'];
const database_version = 1;
const database_name = 'trade_system';

let connection = null;
let closeConnection = null;

export class ConnectionFactory {

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
                    closeConnection = connection.close.bind(connection);
                    connection.close = function() {
                        throw new Error('Cannot close connection!');
                    }
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

    static closeConn() {
        if (connection) {
            closeConnection();
        }
    }
}