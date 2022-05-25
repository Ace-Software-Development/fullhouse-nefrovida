const parseDashboard = require('parse-dashboard');

const dashboard = new parseDashboard( {
    "apps": [ 
        {
            "serverURL": process.env.SERVER_URL,
            "appId": process.env.APP_ID,
            "masterKey": process.env.MASTER_KEY,
            "appName": process.env.NAME
        }
    ],
    // HTTPS
    // "trustProxy": 1,
    "users": [ 
        {
            "user": "user",
            "pass": "pass"
        }
    ],
    // "useEncryptedPasswords": true,
}, 
{ 
    allowInsecureHTTP: false 
})

module.exports = {
    dashboard: dashboard,
    url: '/dashboard'
};
