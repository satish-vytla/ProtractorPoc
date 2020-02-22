var tokenId;
var userName, accountName;
var path = require('path');
var credentials = path.join(__dirname, './../testdata/Credentials.json');

class apiLogin {

  login(username, password){
      
        console.log('----------------------------------------------');
        console.log('apiLogin.js') ;
        console.log('----------------------------------------------');
        var glob = require("glob");
        const updateJsonFile = require('update-json-file');
        
        var configPath = path.join(__dirname, './../testdata/newApplicant.json');

        var request = require('request');
        var jar = request.jar();
        var url = ''+ browser.params.domain +'/openam/json/authenticate?realm=%2Fexternal';
        
        let options = {
            url: ''+ browser.params.domain +'/openam/json/authenticate?realm=%2Fexternal',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'UTF-8',
                'Content-Type': 'application/json',
                'X-OpenAM-Username' : username ,
                'X-OpenAM-Password' : password
            },
        
            strictSSL: false,
            
        };

      function post(options) {
             var defer = protractor.promise.defer();
            console.log("Calling URL");
            request(options, function(error, response, body) {
            console.log('----------------------------------------------');
            console.log('Inside POST Request');
            console.log('----------------------------------------------');
              
                if (error || response.statusCode > 200) {
                    defer.reject({
                        error : error,
                        response : response
                       
                    });
                } else {

                  
                    expect(response.statusCode).toEqual(200);
                    console.log('----------------------------------------------');
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode);
                    console.log('body:', body);
                    console.log('----------------------------------------------');
                    var bdy = JSON.parse(body);
                    tokenId = bdy.tokenId;
                    console.log('body tokenId:', tokenId);
                    
                    updateJsonFile(configPath, (xData) => {
                        console.log('----------------------------------------------');
                        // Factory function is run each time, so `data` is a new object each time
                         var appData = 'iPlanetDirectoryPro='+tokenId;
                         console.log("Appended cookie Data : "+ appData);
                         xData.queryParamsDto.ipCookie = appData;
                         accountName = xData.personalInfo.firstName +' '+xData.personalInfo.lastName;
                         username = xData.accountInfo.userId;
                         console.log('----------------------------------------------');
                         console.log('Done Update json with cookie info');
                         console.log('----------------------------------------------');
                         return xData;
                        });
                     
                        defer.fulfill(tokenId);
                    }
               
            })
           return defer.promise;
           };
               

        function setupCommon() {
            return post(options);
        };
        
        var flow = protractor.promise.controlFlow();
        flow.execute(setupCommon);
       
        };
     
    }
module.exports = new apiLogin();