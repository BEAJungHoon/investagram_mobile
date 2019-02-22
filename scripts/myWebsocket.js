const ab2str = buf => {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

module.exports = (ws, marketArray, onMessage) => {

    ws.onopen = () => {
        // connection opened
        console.log('Websocket opened!');
    };

    ws.onmessage = e => {
        const data = JSON.parse(ab2str(e.data));
        // console.log('Market:', data.code, 'Price:', data.trade_price);
        onMessage(data.code, data.trade_price);
    };

    ws.onerror = (e) => {
        // an error occurred
        console.log(e.message);
    };

    ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
    };

    const subscribeTicker = marketArray => {
        ws.send(JSON.stringify(
            [
                { "ticket": "test" }, { "type": "ticker", "codes": marketArray }
                // {"type":"ticker", "codes": marketArray}               
            ]
        ));
    }
    subscribeTicker(marketArray);
}

