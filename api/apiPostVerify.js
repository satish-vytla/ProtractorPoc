
class apiPostVerify {
  

    postVerify(VfCode,AAMCwamId,configPath){

        console.log('----------------------------------------------');
        console.log('apiPostVerify.js') ;
        console.log('----------------------------------------------');

        const updateJsonFile = require('update-json-file');
       // var path = require('path');
      //  var configPath = path.join(__dirname, './../../testData/application/newApplicant.json');
        var request = require('request');
        var jar = request.jar();
        var urii = ''+ browser.params.domain +'/user-account-service/registration/accounts/processVerification';
        //  var url = ''+ browser.params.domain +'/account/#/user/personal?gotoUrl=https:%2F%2Fapps.ftest.aamc.org%2Fmrs&stakesLvl=true&allowInternal=false';
        console.log("Calling URL :" + urii);
        var sdata = '{"verificationCode" : "'+ VfCode + '", "wamId" :"' + AAMCwamId +'"}' ;
        console.log("Post verification json : " + sdata );

        let options = {
            url: urii,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'UTF-8',
                'Content-Type': 'application/json',
                },
            
            body: sdata,
            strictSSL: false
            
        };

      function postfun(options) {
            var defer = protractor.promise.defer();
            console.log("Calling URL");
            request(urii,options, function(error, response, body) {
               console.log('----------------------------------------------');
               console.log('Inside POST Request');
               console.log('----------------------------------------------');
              
                if (error || response.statusCode > 200 ) {
                    defer.reject({
                        error : error,
                        response : response
                       
                    });
                } else {

                    defer.fulfill(response.statusCode);
                    expect(response.statusCode).toEqual(200);
                    console.log('----------------------------------------------');
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode);
                    console.log('body:', body);   
                    console.log('response:', response);
                    console.log('----------------------------------------------');
                    var bdy = JSON.parse(body);
                        
                }
               
            })
           return defer.promise;
           };
      
       function setupCommon1() {
            return postfun(options);
        };
               
        var flow = protractor.promise.controlFlow();
        flow.execute(setupCommon1);
             
        };
     
    }

module.exports = new apiPostVerify();