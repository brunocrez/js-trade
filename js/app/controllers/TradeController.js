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

        ConnectionFactory.getConn()
            .then(conn => new TradeDao(conn))
            .then(obj => obj.listAll())
            .then(tradeList => tradeList.forEach(trade => this._tradeList.addToList(trade)))
            .catch(err => this._message.message = err);
    }

    addTrade(event) {
        event.preventDefault();

        ConnectionFactory.getConn()
            .then(conn => {
                const newTrade = this._createTradeObject()
                new TradeDao(conn)
                    .save(newTrade)
                    .then(() => {
                        this._tradeList.addToList(newTrade);
                        this._message.message = 'Added Successfully!';
                        this._resetForm();
                    })
            })
            .catch(err => this._message.message = err);
    }

    importTrades() {
        const service = new TradeService();
        service.getAllTrades()
            .then(tradeList => tradeList.filter(item =>
                !this._tradeList.list.some(existingItem =>
                    JSON.stringify(existingItem) == JSON.stringify(item))))
            .then(trades => trades.forEach(trade => {
                this._tradeList.addToList(trade);
                this._message.message = 'Item Imported Successfully!';
            }))
            .catch(err => this._message.message = err);
    }

    clearTrades() {
        ConnectionFactory.getConn()
            .then(conn => new TradeDao(conn))
            .then(obj => obj.clearAll())
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