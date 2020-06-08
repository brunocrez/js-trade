class TradeController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputQuantity = $('#quantity');
        this._inputValue = $('#value');

        this._tradeList = new TradeList();
        this._tradeView = new TradeView($('#tradeView'));

        this._tradeView.updateView(this._tradeList);
    }

    addTrade(event) {
        event.preventDefault();

        this._tradeList.addToList(this._createTradeObject());
        this._tradeView.updateView(this._tradeList);
        this._resetForm();
    }

    _createTradeObject() {
        return new Trade(
            DateHelper.stringToDate(this._inputDate.value),
            this._inputQuantity.value,
            this._inputValue.value
        );
    }

    _resetForm() {
        this._inputDate.value = '';
        this._inputQuantity.value = 1;
        this._inputValue.value = 0.0;

        this._inputDate.focus();
    }
}