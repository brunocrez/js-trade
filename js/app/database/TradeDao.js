class TradeDao {

    constructor(conn) {
        this._conn = conn;
        this._store = 'trades';
    }

    save(trade) {
        return new Promise((resolve, reject) => {
            let req = this._conn
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(trade);

            req.onsuccess = event => {
                resolve();
            };

            req.onerror = event => {
                console.log(event.target.error);
                reject('Something went wrong while trying to add new object!');
            };
        });
    }

    listAll() {
        return new Promise((resolve, reject) => {
            let cursor = this._conn
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let tradeList = [];

            cursor.onsuccess = event => {
                let current = event.target.result;
                if (current) {
                    let data = current.value;
                    tradeList.push(new Trade(data._date, data._quantity, data._value));
                    current.continue();
                } else {
                    resolve(tradeList);
                }
            };

            cursor.onerror = event => {
                console.log(event.target.error);
                reject('Something went wrong trying to list trades!');
            };
        });
    }

    clearAll() {
        return new Promise((resolve, reject) => {
            let cursor = this._conn
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            cursor.onsuccess = event => {
                resolve('Database cleared Successfully!');
            };

            cursor.onerror = event => {
                console.log(event.target.error);
                reject('Something went wrong trying to clear Database!');
            };
        });
    }
}