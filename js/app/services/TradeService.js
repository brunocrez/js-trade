class TradeService {

    getTrades(callback) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/trades');

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    callback(null, JSON.parse(xhr.responseText)
                        .map(item => new Trade(new Date(item.date), item.quantity, item.value)));
                } else {
                    console.log(xhr.responseText);
                    callback('Something went wrong!', null);
                }
            }
        };

        xhr.send();
    }
}