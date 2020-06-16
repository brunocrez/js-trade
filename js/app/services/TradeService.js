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

    getAllTrades() {
        return Promise.all([
                this.getTradesOnWeek(),
                this.getTradesOnLastWeek(),
                this.getTradesOnLastFourteenDays()
            ])
            .then(array => {
                let flatArray = array
                    .reduce((newArr, arr) => newArr.concat(arr), [])

                return flatArray;
            })
            .catch(err => { throw new Error(err) });

    }

    addTrade(trade) {
        return ConnectionFactory.getConn()
            .then(conn => new TradeDao(conn))
            .then(obj => obj.save(trade))
            .then(() => 'Trade Added Successfully!')
            .catch(err => {
                console.log(err);
                throw new Error('Something went wrong trying to create new Trade!');
            });
    }

    listAllTrades() {
        return ConnectionFactory.getConn()
            .then(conn => new TradeDao(conn))
            .then(obj => obj.listAll())
            .catch(err => {
                console.log(err);
                throw new Error('Something went wrong trying to list Trades!');
            });
    }

    clearAllTrades() {
        return ConnectionFactory.getConn()
            .then(conn => new TradeDao(conn))
            .then(obj => obj.clearAll())
            .catch(err => {
                console.log(err);
                throw new Error('Something went wrong trying to clear Trades!');
            });
    }
}