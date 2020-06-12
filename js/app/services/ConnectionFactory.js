var database_stores = ['trades'];
var database_version = 1;
var database_name = 'trade_system';

class ConnectionFactory {

    constructor() {
        throw new Error('Connection Factory cannot be instantiated!');
    }

    static getConn() {
        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(database_name, database_version);

            openRequest.onupgradeneeded = event => {

            };

            openRequest.onsuccess = event => {

            };

            openRequest.onerror = event => {

            };
        });
    }
}