//'use strict'

//var https = require("https");
let faker = require('faker');
//let credentials = require('./../testdata/Credentials.json');
var userName, accountName;
var path = require('path');
var credentials = path.join(__dirname, './../testdata/Credentials.json');

class createApplicantData {

    updateJson(configPath) {
        //console.log('credentialscredentialscredentials', JSON.stringify(credentials));

        console.log('----------------------------------------------');
        console.log('createApplicantData.js');
        console.log('----------------------------------------------');

        faker.locale = "en_US";
        // const fs = require('fs');
        const updateJsonFile = require('update-json-file');

        // var path = require('path');
        //var configPath = path.join(__dirname, './../../testData/application/newApplicant.json');
        console.log('configPath :' + configPath);

        var appFirstName = faker.name.firstName();
        var appLastName = faker.name.lastName();
        var firstInitial = appFirstName[0].substring(0,1);
        var sex = 'M';
        var appUserName = faker.internet.userName().substring(0, 18);
        //var appEmail = faker.internet.email();
        var appEmail = firstInitial + appLastName + '@testmail.com';
        //var appEmail = appFirstName + 'svytla@aamc.org';
/* 
        var appFirstName = faker.name.firstName();
        var appLastName = faker.name.lastName();
        var sex = 'M';
        var appUserName = faker.internet.userName().substring(0, 18);
        //var appEmail = faker.internet.email();

        var appEmail = appFirstName + 'svytla@aamc.org'; */
        var appPassword = 'Password1!';
        var gotoUrl = '' + browser.params.domain + '/mrs';

        //new one -------------
       //latest change july 18th
        //var streetname = faker.address.streetName();

        //-------------------


        //  var appPassword = faker.internet.password();
        //Append the Random values in Json Structure
        updateJsonFile(configPath, (data) => {
            console.log('Data updateJsonFile configPath path:',data);
            console.log('Data ***********************************************');

            /*personalInfo*/
            data.personalInfo.firstName = appFirstName;
            data.personalInfo.lastName = appLastName;
            data.personalInfo.sex = sex;

            //accountInfo.
            data.accountInfo.userId = appUserName;
            data.accountInfo.email = appEmail;
            data.accountInfo.confirmEmail = appEmail;
            data.accountInfo.password = appPassword;
            data.accountInfo.confirmPassword = appPassword;


            //data.addressInfo.addressLine1 = streetname;

            //queryParamsDto.
            data.queryParamsDto.gotoUrl = gotoUrl;
            data.queryParamsDto.verificationCode = null;
            data.queryParamsDto.wamId = null;
            data.queryParamsDto.aamcId = null;
            data.queryParamsDto.ipCookie = null;

            var self = this;
            console.log('Updated Josn Data is :', data);

            return data;


        });
        updateJsonFile(credentials, (dataCred) => {
            console.log('----------------------------------------------');
            console.log('started update json for credentials');
            console.log('----------------------------------------------');
            console.log('Credentials json file path info', JSON.stringify(credentials));
            console.log('Credentials josn file info', dataCred);
            dataCred.users[browser.params.env].Examinee["0"].userName = null;
            dataCred.users[browser.params.env].Examinee["0"].accountName = null;
            dataCred.users[browser.params.env].Examinee["0"].userName = appUserName;
            dataCred.users[browser.params.env].Examinee["0"].accountName = appFirstName + ' ' + appLastName;
            console.log('----------------------------------------------');
            console.log('Done update json for credentials');
            console.log('----------------------------------------------');
            return dataCred;

        });

        console.log('----------------------------------------------');
        console.log('Done update json');
        console.log('----------------------------------------------');




    }
}
module.exports = new createApplicantData();