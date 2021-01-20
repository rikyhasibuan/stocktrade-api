'use strict'

module.exports = function(app) {
    let route = require('./controller')
    app.route('/').get(route.index)
    app.route('/coins/:resolution').get(route.coins)
    app.route('/stocks/:resolution').get(route.stocks)
};