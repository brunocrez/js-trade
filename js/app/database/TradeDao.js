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
}