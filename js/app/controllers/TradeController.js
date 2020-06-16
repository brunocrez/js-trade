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

        this._tradeService = new TradeService();
        this._init();
    }

    _init() {
        this._tradeService
            .listAllTrades()
            .then(tradeList => tradeList.forEach(trade => this._tradeList.addToList(trade)))
            .catch(err => this._message.message = err);

        setInterval(() => {
            this.importTrades();
        }, 5000);
    }

    addTrade(event) {
        event.preventDefault();
        const newTrade = this._createTradeObject();

        this._tradeService
            .addTrade(newTrade)
            .then(message => {
                this._tradeList.addToList(newTrade);
                this._message.message = message;
                this._resetForm();
            })
            .catch(err => this._message.message = err);
    }

    importTrades() {
        this._tradeService
            .importTrades(this._tradeList.list)
            .then(trades => trades.forEach(trade => {
                this._tradeList.addToList(trade);
                this._message.message = 'Items Imported Successfully!';
            }))
            .catch(err => this._message.message = err);
    }

    clearTrades() {
        this._tradeService
            .clearAllTrades()
            .then(message => {
                this._message.message = message;
                this._tradeList.clearList();
            })
            .catch(message => this._message.message = message);
    }

    _createTradeObject() {
        return new Trade(
            DateHelper.stringToDate(this._inputDate.value),
            parseInt(this._inputQuantity.value),
            parseFloat(this._inputValue.value)
        );
    }

    _resetForm() {
        this._inputDate.value = '';
        this._inputQuantity.value = 1;
        this._inputValue.value = 0.0;

        this._inputDate.focus();
    }
}