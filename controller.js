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
    let resolution = req.params.resolution;
    let from = 1420088400
    let to = dayjs().locale('id').tz('Asia/Jakarta').unix()
    axios.get(`https://analytics2.rti.co.id/tview/rti_history.jsp?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`)
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
        'AALI', 'ACES', 'ADRO', 'AKRA', 'ANTM',
        'APLN', 'ASII', 'BBCA', 'BBNI', 'BBRI', 
        'BBTN', 'BDMN', 'BJBR', 'BJTM', 'BMRI',
        'BMTR', 'BNLI', 'BRIS', 'BSDE', 'BTPS',
        'BULL', 'CLEO', 'CPIN', 'CTRA', 'DMAS',
        'ELSA', 'ERAA', 'EXCL', 'HOKI', 'ICBP', 
        'INCO', 'INDF', 'INKP', 'INTP', 'ISAT', 
        'ITMG', 'JPFA', 'JSMR', 'KAEF', 'KLBF', 
        'LINK', 'LSIP', 'MAIN', 'MAPI', 'MDKA', 
        'MEDC', 'MIKA', 'MNCN', 'MTDL', 'MYOR', 
        'PGAS', 'PTBA', 'PTPP', 'PTPP', 'RALS', 
        'SIDO', 'SMRA', 'TINS', 'TKIM', 'TLKM', 
        'UNTR', 'UNVR', 'WIKA', 'WOOD', 'WTON'
    ]

    let from = 1420088400
    let to = dayjs().locale('id').tz('Asia/Jakarta').unix()
    let resolution = req.params.resolution;
    let price = []
    let promises = []
    for (let i = 0; i < stock_data.length; i++) {
        promises.push(
            axios.get(`https://analytics2.rti.co.id/tview/rti_history.jsp?symbol=${stock_data[i]}&resolution=${resolution}&from=${from}&to=${to}`)
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