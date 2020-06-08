class TradeList {

    constructor() {
        this._list = [];
    }

    addToList(trade) {
        this._list.push(trade);
    }

    get list() {
        return [].concat(this._list);
    }

}