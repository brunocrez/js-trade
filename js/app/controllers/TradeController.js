class TradeController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputQuantity = $('#quantity');
        this._inputValue = $('#value');
    }

    addTrade(event) {
        event.preventDefault();

        let newTrade = new Trade(
            DateHelper.stringToDate(this._inputDate.value),
            this._inputQuantity.value,
            this._inputValue.value
        );


    }
}