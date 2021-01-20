'use strict';

const response = require('./res')
const axios = require('axios')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
const _ = require('lodash')
require('dayjs/locale/id')
dayjs.extend(utc)
dayjs.extend(timezone)

exports.stocks = function(req, res) {
    let stock_data = [
        'ACES', 'ADRO', 'AKRA', 'ANTM', 'ASII', 
        'BBCA', 'BBNI', 'BBRI', 'BBTN', 'BJBR', 
        'BJTM', 'BMRI', 'BMTR', 'BNLI', 'BRIS', 
        'BSDE', 'BTPS', 'CPIN', 'CTRA', 'ELSA', 
        'ERAA', 'EXCL', 'ICBP', 'INCO', 'INDF', 
        'INKP', 'INTP', 'ITMG', 'JPFA', 'JSMR', 
        'KAEF', 'KLBF', 'MDKA', 'MIKA', 'MNCN', 
        'PGAS', 'PTBA', 'PTPP', 'PWON', 'SCMA', 
        'SMGR', 'SMRA', 'SRIL', 'TBIG', 'TKIM', 
        'TLKM', 'TOWR', 'UNTR', 'UNVR', 'WIKA'
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

exports.coins = function(req, res) {
    let coin_data = ['BTCUSDT', 'BCHUSDT', 'LTCUSDT', 'ETHUSDT', 'BNBUSDT', 'TRXUSDT', 'LINKUSDT']
    let resolution = req.params.resolution
    let promises = []
    let price = []
    for (let i = 0; i < coin_data.length; i++) {
        promises.push(
            axios.get(`https://api.binance.com/api/v3/klines?symbol=${coin_data[i]}&limit=500&interval=${resolution}`)
            .then((resp) => {
                let o = [], v = [], h = [], l = [], c = []
                for (let n = 0; n < resp.data.length; n++) {
                    o.push(_.toNumber(resp.data[n][1]))
                    h.push(_.toNumber(resp.data[n][2]))
                    l.push(_.toNumber(resp.data[n][3]))
                    c.push(_.toNumber(resp.data[n][4]))
                    v.push(_.toNumber(resp.data[n][5]))
                }
                price.push({ 'coin':coin_data[i], 'ohlc': { o:o, h:h, l:l, c:c, v:v } })
            })
        )
    }
    Promise.all(promises).then(() => res.json(price))
}

exports.index = function(req, res) {
    response.ok("hello there!", res)
};