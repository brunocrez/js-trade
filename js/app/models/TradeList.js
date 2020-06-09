class TradeList {

    constructor(trigger) {
        this._list = [];
        this._trigger = trigger;
    }

    addToList(trade) {
        this._list.push(trade);
        this._trigger(this);
    }

    clearList() {
        this._list = [];
        this._trigger(this);
    }

    get list() {
        return [].concat(this._list);
    }
}