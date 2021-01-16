'use strict'

module.exports = function(app) {
    let route = require('./controller')
    app.route('/').get(route.index)
    app.route('/stock/:symbol').get(route.stock)
    app.route('/stocks/:resolution').get(route.stocks)
};