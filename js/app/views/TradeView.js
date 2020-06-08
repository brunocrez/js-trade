class TradeView {

    constructor(element) {
        this._element = element;
    }

    _renderTemplate(tradeList) {
            return `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">DATA</th>
                        <th scope="col">QUANTIDADE</th>
                        <th scope="col">VALOR</th>
                        <th scope="col">VOLUME</th>
                    </tr>
                </thead>
                <tbody>
                    ${tradeList.list.map(item => 
                        `
                            <tr>
                                <td>${DateHelper.dateToString(item.date)}</td>
                                <td>${item.quantity}</td>
                                <td>${item.value}</td>
                                <td>${item.volume}</td>
                            </tr>
                        `
                    ).join('')}
                </tbody>
            </table>
        `;
    }

    updateView(tradeList) {
        this._element.innerHTML = this._renderTemplate(tradeList);
    }
}