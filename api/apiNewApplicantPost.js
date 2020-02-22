class apiNewApplicantPost {

    postData(inpData){
        console.log('----------------------------------------------');
        console.log('apiNewApplicantPost.js') ;
        console.log('----------------------------------------------');
        var request = require('request');
        var jar = request.jar();

        let postData=JSON.stringify(inpData);
        var url = ''+ browser.params.domain +'/user-account-service/registration/account';
       //var url = 'https://apps.ftest.aamc.org/user-account-service/registration/account';

        console.log("postData :: " + postData) ;
        
        let options = {
            url: ''+ browser.params.domain +'/user-account-service/registration/account',
           //https://apps.ftest.aamc.org/mrs/user-account-service/registration/account
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'UTF-8',
                'Content-Type': 'application/json'
            },
        
            strictSSL: false,
            body:postData
        };

        function post(options) {
            var defer = protractor.promise.defer();
            console.log("Calling URL : " + url);
            request(options, function(error, response, body) {
                console.log('----------------------------------------------');
                console.log('Inside POST Request : apiNewApplicantPost.js');
                console.log('----------------------------------------------');
                if (error || response.statusCode > 200) {
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
                    console.log('----------------------------------------------');
                }

            })
            return defer.promise;
        }
          
        function setupCommon() {
            return post(options);
        }
         
        var flow = protractor.promise.controlFlow();
        flow.execute(setupCommon);
              
        }

}

module.exports = new apiNewApplicantPost();