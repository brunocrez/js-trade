class TradeController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputQuantity = $('#quantity');
        this._inputValue = $('#value');

        this._tradeView = new TradeView($('#tradeView'));
        this._tradeList = new Bind(new TradeList(), this._tradeView, 'addToList', 'clearList');

        this._messageView = new MessageView($('#messageView'));
        this._message = new Bind(new Message(), this._messageView, 'message');
    }

    addTrade(event) {
        event.preventDefault();
        this._tradeList.addToList(this._createTradeObject());
        this._message.message = 'Added Successfully!';
        this._resetForm();
    }

    importTrades() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/trades');

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    JSON.parse(xhr.responseText)
                        .map(item => new Trade(new Date(item.date), item.quantity, item.value))
                        .forEach(trade => this._tradeList.addToList(trade));

                    this._message.message = 'Imported Successfully!';
                } else {
                    this._message.message = 'Something went wrong!';
                }
            }
        };

        xhr.send();
    }

    clearTrades() {
        this._tradeList.clearList();
        this._message.message = 'List Cleared Successfully!';
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