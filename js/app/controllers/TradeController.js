class TradeController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputQuantity = $('#quantity');
        this._inputValue = $('#value');

        this._tradeList = new TradeList(model => this._tradeView.updateView(model));

        this._tradeView = new TradeView($('#tradeView'));
        this._tradeView.updateView(this._tradeList);

        this._message = new Message();
        this._messageView = new MessageView($('#messageView'));
        this._messageView.updateView(this._message);
    }

    addTrade(event) {
        event.preventDefault();

        this._tradeList.addToList(this._createTradeObject());

        this._message.message = 'Added Successfully!';
        this._messageView.updateView(this._message);

        this._resetForm();
    }

    clearTrades() {
        this._tradeList.clearList();

        this._message.message = 'List Cleared Successfully!';
        this._messageView.updateView(this._message);
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