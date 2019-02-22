export const getTicker = (exchange, market, callback) => {
    let url = '';
    console.log('exchange:', exchange.toLowerCase());
    switch(exchange.toLowerCase()) {
        case 'upbit':
            url += 'https://api.upbit.com/v1/ticker?markets=';
        break;
        default: break;
    }
    url += market;

    fetch(url).then(res => {
        res.json().then(data => {
            trade_price = data[0].trade_price;
            console.log(trade_price);
            callback(null, trade_price);
        });
    })
    .catch(err => {
        console.log('getTicker:err:', err);
        callback(err, null);
    });
}

export const tickDown = (exchange, price) => {
    price = Number(price);

    switch(exchange) {
        case 'upbit':
        const level = priceLevels.upbit.levels.find(lvl => price >= lvl);
        if(level !== price) {
            const unit = priceLevels.upbit[level];
            return (price - unit).toFixed(countDecimals(unit));
        } else {
            if(price >= 10) {
                const levelIndex = priceLevels.upbit.levels.findIndex(lvl => price >= lvl) + 1;
                const unit = priceLevels.upbit[priceLevels.upbit.levels[levelIndex].toString()];
                return (price - unit).toFixed(countDecimals(unit));
            } else {
                const unit = priceLevels.upbit[level]
                    return (price > 0.01) ? (price - unit).toFixed(countDecimals(unit)) : 0.01;
            }
        }
        default: 
        return;
    }
}

export default {
    getTicker,
    tickDown
}