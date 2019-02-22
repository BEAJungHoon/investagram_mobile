export const exchangeNames = [
    {value: 'upbit', label: 'Upbit'},
    // {value: 'binance', label: 'Binance'},
]

export const priceLevels = {
    upbit: { // KRW 기준
        levels: [2000000, 1000000, 500000, 100000, 10000, 1000, 100, 10, 0],
        2000000: 1000, //when 2000000<=
        1000000: 500, //when 1000000<=, <2000000
        500000: 100,
        100000: 50,
        10000: 10,
        1000: 5,
        100: 1,
        10: 0.1, // when 10<=, <100
        0: 0.01, // when 0<=, <10
    }
}

export default {
    exchangeNames,
    priceLevels
}