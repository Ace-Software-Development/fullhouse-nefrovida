const parseDashboard = require('parse-dashboard');

const dashboard = new parseDashboard({
    "apps": [{
        "serverURL": process.env.SERVER_URL,
        "appId": process.env.APP_ID,
        "masterKey": process.env.MASTER_KEY,
        "appName": process.env.NAME
    }],
    "users": [{
        "user": "user",
        "pass": "pass"
    }]
}, { allowInsecureHTTP: true })

module.exports = {
    dashboard: dashboard,
    url: '/dashboard'
};
