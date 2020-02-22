const request = require('request');
let Util = require('./../utilities/utils');
const utils = new Util();
let base = module.exports = {};
base.get = function (url, cookie) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    let cookieProms = cookie ? Promise.resolve(cookie) : utils.getCookie('iPlanetDirectoryPro');
    return cookieProms.then(function (authCookie) {
        console.log('************************Auth cookie**********************');
        console.log(authCookie.value);
        let options = {
            url: url,
            headers: {
                "rejectUnauthorized": false,
                'Cookie': 'iPlanetDirectoryPro=' + authCookie.value,
                'Content-Type': 'application/json'
            }
        };
        return new Promise(function (fulfill, reject) {
            request(options, function (error, respnse, body) {
                if (error) {
                    reject(error);
                } else if (body) {
                    fulfill(body);
                } else {
                    reject('Rest call failed with for  URL:' + url);
                }
            })
        }) 
    })


}

base.host = 'http://apps.ftest.aamc.org';


