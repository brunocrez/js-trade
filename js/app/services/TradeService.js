class TradeService {

    constructor() {
        this._http = new HttpService();
    }

    getTradesOnWeek() {
        return new Promise((resolve, reject) => {
            this._http.get('http://localhost:3000/week')
                .then(trades => {
                    resolve(trades.map(item => new Trade(new Date(item.date), item.quantity, item.value)));
                })
                .catch(err => {
                    console.log(err);
                    reject('Error: Cannot GET trades from this week!');
                })
        });
    }

    getTradesOnLastWeek() {
        return new Promise((resolve, reject) => {
            this._http.get('http://localhost:3000/lastweek')
                .then(trades => {
                    resolve(trades.map(item => new Trade(new Date(item.date), item.quantity, item.value)));
                })
                .catch(err => {
                    console.log(err);
                    reject('Error: Cannot GET trades from last week!');
                })
        });
    }

    getTradesOnLastFourteenDays() {
        return new Promise((resolve, reject) => {
            this._http.get('http://localhost:3000/twoweeksago')
                .then(trades => {
                    resolve(trades.map(item => new Trade(new Date(item.date), item.quantity, item.value)));
                })
                .catch(err => {
                    console.log(err);
                    reject('Error: Cannot GET trades from two weeks ago!');
                })
        });
    }
}