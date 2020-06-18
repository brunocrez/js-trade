class TradeList {

    constructor() {
        this._list = [];
    }

    addToList(trade) {
        this._list.push(trade);
    }

    clearList() {
        this._list = [];
    }

    get list() {
        return [].concat(this._list);
    }
}