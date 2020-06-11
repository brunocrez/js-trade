class TradeService {

    getTradesOnWeek() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/week');

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(item => new Trade(new Date(item.date), item.quantity, item.value)));
                    } else {
                        console.log(xhr.responseText);
                        reject('Error: Cannot GET trades from this week!');
                    }
                }
            };

            xhr.send();
        })
    }

    getTradesOnLastWeek() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/lastweek');

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(item => new Trade(new Date(item.date), item.quantity, item.value)));
                    } else {
                        console.log(xhr.responseText);
                        reject('Error: Cannot GET trades from last week!');
                    }
                }
            };

            xhr.send();
        })
    }

    getTradesOnLastFourteenDays() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/twoweeksago');

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(item => new Trade(new Date(item.date), item.quantity, item.value)));
                    } else {
                        console.log(xhr.responseText);
                        reject('Error: Cannot GET trades from two weeks ago!');
                    }
                }
            };

            xhr.send();
        })
    }
}