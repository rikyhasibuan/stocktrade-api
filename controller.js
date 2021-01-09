'use strict';

const response = require('./res')

exports.stock = function(req, res) {
    const axios = require('axios')
    const dayjs = require('dayjs')
    const utc = require('dayjs/plugin/utc')
    const timezone = require('dayjs/plugin/timezone')
    require('dayjs/locale/id')
    dayjs.extend(utc)
    dayjs.extend(timezone)

    let symbol = req.params.symbol;
    let from = 1420088400
    let to = dayjs().locale('id').tz('Asia/Jakarta').unix()
    axios.get(`https://analytics2.rti.co.id/tview/rti_history.jsp?symbol=${symbol}&resolution=W&from=${from}&to=${to}`)
    .then((resp) => {
        res.json(resp.data)
    })
    .catch(function (error) {
        console.log(error)
    })
}

exports.stocks = function(req, res) {
    const axios = require('axios')
    const dayjs = require('dayjs')
    const utc = require('dayjs/plugin/utc')
    const timezone = require('dayjs/plugin/timezone')
    require('dayjs/locale/id')
    dayjs.extend(utc)
    dayjs.extend(timezone)

    let stock_data = [
        'BBCA', 'BJTM', 'SIDO', 'TLKM', 'ITMG',
        'BBRI', 'ICBP', 'ULTJ', 'UNVR', 'ADRO', 
        'BBNI', 'ACES', 'ASII', 'PWON', 'ANTM',
        'BMRI', 'EKAD', 'INDF', 'PTBA', 'TINS',
        'BRIS', 'SMRA', 'ADHI', 'KAEF', 'MYOR',
        'CPIN', 'BTPS', 'PGAS', 'TKIM', 'BJBR',
        'AKRA', 'ASRI', 'BBTN', 'BKSL', 'BSDE',
        'ELSA', 'EXCL', 'GGRM', 'HMSP', 'INCO',
        'INDY', 'INKP', 'INTP', 'JSMR', 'KLBF',
        'LPKR', 'LPPF', 'MEDC', 'MNCN', 'PTPP',
        'SCMA', 'SMGR', 'SRIL', 'SSMS', 'TPIA',
        'UNTR', 'WIKA', 'WSBP', 'WSKT'
    ]

    let from = 1420088400
    let to = dayjs().locale('id').tz('Asia/Jakarta').unix()
    let price = []
    let promises = []
    for (let i = 0; i < stock_data.length; i++) {
        promises.push(
            axios.get(`https://analytics2.rti.co.id/tview/rti_history.jsp?symbol=${stock_data[i]}&resolution=W&from=${from}&to=${to}`)
            .then((resp) => {
                price.push({ 'stock':stock_data[i], 'ohlc': resp.data })
            })
        )
    }
    Promise.all(promises).then(() => res.json(price))
}

exports.index = function(req, res) {
    response.ok("hello there!", res)
};