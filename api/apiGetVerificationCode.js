
class apiGetVerificationCode {

 getUserInfo(ipCookie, username, configPath){

        console.log('----------------------------------------------');
        console.log('apiGetVerificationCode.js') ;
        console.log('----------------------------------------------');
        const updateJsonFile = require('update-json-file');
        var request = require('request');
        var jar = request.jar();
        var urii = ''+ browser.params.domain +'/openam/json/users/'+username+'?realm=%2Fexternal';
        console.log("Calling URL :" + urii);
        let options = {
            url: urii,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'UTF-8',
                'Content-Type': 'application/json',
                'Cookie' : ipCookie
                },
        
            strictSSL: false
            
        };

      function getfun(options) {
            var defer = protractor.promise.defer();
           // console.log("Calling URL");
            request.get (urii,options, function(error, response, body) {
           // console.log('Inside GET Request.................................. ');
              
                if (error || response.statusCode > 200 ) {
                    defer.reject({
                        error : error,
                        response : response
                       
                    });
                } else {

                    defer.fulfill(response.statusCode);
                    expect(response.statusCode).toEqual(200);
                   console.log('----------------------------------------------');
                   console.log('error:', error); // Print the error if error occurred
                   console.log('statusCode:', response && response.statusCode);
                   console.log('body:', body);   
                   console.log('response:', response);
                   console.log('----------------------------------------------');
                   var bdy = JSON.parse(body);
                   var aamcVerificationCD = bdy.aamcVerificationCD;
                   var aamcWamId = bdy.aamcWamId;
                   var aamcId = bdy.aamcId;
                    console.log('----------------------------------------------');                                    
                    console.log('aamcVerificationCD :', aamcVerificationCD);
                    console.log('aamcWamId          :', aamcWamId);
                    console.log('aamcId             :', aamcId);
                    console.log('----------------------------------------------');

                    updateJsonFile(configPath, (xData) => {
                        xData.queryParamsDto.verificationCode = aamcVerificationCD;
                        xData.queryParamsDto.wamId = aamcWamId;
                        xData.queryParamsDto.aamcId = aamcId;
                        console.log('----------------------------------------------');
                        console.log('Done Update json with VFcode aamcId and WamId');
                        console.log('----------------------------------------------');
                        return xData;
                        });
                }
               
            })
           return defer.promise;
           };
      
       function setupCommon1() {
            return getfun(options);
        };
               
        var flow = protractor.promise.controlFlow();
        flow.execute(setupCommon1);
             
        };
     
    }

module.exports = new apiGetVerificationCode();