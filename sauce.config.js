var failFast = require('jasmine-fail-fast');
var ptorFailfast = require('protractor-fail-fasts');
var path = require('path');
exports.config = {
    // directConnect: 'true',
    framework: 'jasmine2',
    multiCapabilities: [
        {
            'browserName': 'chrome',
            // 'browserName': 'firefox',
            //'marionette': true,
            'shardTestFiles': true,
            'maxInstances': 2,
            username: 'satishvytla',
            accessKey: '',
            seleniumAddress: 'http://ondemand.saucelabs.com:80/wd/hub',
            'chromeOptions': {

                prefs: {
                    download: {
                        'prompt_for_download': false,
                        'directory_upgrade': true,
                        'default_directory': __dirname + 'downloads',
                    }
                }
            }

        },
        /*{
        'browserName': 'firefox',
        'shardTestFiles': true, // parallel execution (true/false)
        'acceptInsecureCerts': true,
        'maxInstances': 2, // No of instances 
    },*/

    ],
    seleniumAddress: 'http://localhost:4444/wd/hub/',

    // specs: ['./specs/**/createUserUsingApiSpec.js'],
    // specs: ['./specs/**/MRSProdSpec.js'],
    // specs: ['./specs/**/SRSProdSpec.js'],
    // specs: ['./specs/**/MSARProdSpec.js'],
    // specs: ['./specs/**/atsMAOProdSpec.js'],
    // specs: ['./specs/**/CiMAssessmentProdSpec.js'],
    // specs: ['./specs/**/CiMRPSProdSpec.js'],
    // specs: ['./specs/**/EECProdSpec.js'],
    // specs: ['./specs/**/FactsFiguresProdSpec.js'],
    // specs: ['./specs/**/FedLoansProdSpec.js'],
    // specs: ['./specs/**/FirstProdSpec.js'],
    // specs: ['./specs/**/SEPProdSpec.js'],
    // specs: ['./specs/**/SHPEPProdSpec.js'],
    // specs: ['./specs/**/DMSProdSpec.js'],
    specs: ['./specs/**/MRSProdSpec.js',
        './specs/**/MSARProdSpec.js',
        './specs/**/SRSProdSpec.js',
        './specs/**/atsMAOProdSpec.js',
        './specs/**/CiMAssessmentProdSpec.js',
        './specs/**/CiMRPSProdSpec.js',
        './specs/**/EECProdSpec.js',
        './specs/**/FactsFiguresProdSpec.js',
        './specs/**/FedLoansProdSpec.js',
        './specs/**/FirstProdSpec.js',
        './specs/**/SEPProdSpec.js',
        './specs/**/SHPEPProdSpec.js',
        './specs/**/DMSProdSpec.js'
    ],

    jasmineNodeOpts: {
        defaultTimoutInterval: 1200000
    },
    sauceUser: 'satishvytla',
    sauceKey: '',
    seleniumAddress: 'http://ondemand.saucelabs.com:80/wd/hub',
    params: {
        waits: {
            MEDIUM_WAIT: 30000,
            LONG_WAIT: 60000,
            SHORT_WAIT: 10000
        },
        rootPath: path.resolve(__dirname),
        //appUrl: "https://apps.ftest.aamc.org/amcas/#!/main/yearSelect",
        domain: "https://apps.ftest.aamc.org",
        appUrl: "https://apps.ftest.aamc.org/mrs/",
        // appUrl: "https://apps.ftest.aamc.org/account/#/",
        // appUrl: "https://apps.staging.aamc.org/mrs/",
        // domain: "https://apps.staging.aamc.org",
        // appUrl: "https://apps.aamc.org/mrs/",
        // domain: "https://apps.aamc.org",
        // appUrl: "https://apps.ftest.aamc.org/account/#/"
        //appUrl: "https://apps.ftest.aamc.org/account/#/"
        env: 'ftest'


    },
    stopSpecOnExpectationFailure: true,
    beforeLaunch: function () {
        var fs = require('fs-extra');
        fs.emptyDir(__dirname + '/reports/screenshots/', function (err) {
            console.log(err);
        });
        fs.emptyDir(__dirname + '/reports/junitReports/', function (err) {
            console.log(err);
        });
    },
    onPrepare: function () {
        highlightWebElement = true;
        jasmine.getEnv().addReporter(failFast.init());
        jasmine.getEnv().addReporter(ptorFailfast.init());

        var reporters = require('jasmine-reporters');
        return browser.getSession().then(session => {
            return browser.getProcessedConfig().then(function (config) {
                //getProcessedConfig() will call multiCapabilities using protractor 
                // you could use other properties here if you want, such as platform and version
                var browserName = config.capabilities.browserName;
                var junitReportFile = 'xml-results-' + session.getId() + '-' + Date.now() + '-';
                var junitReporter = new reporters.JUnitXmlReporter({
                    savePath: __dirname + '/reports/junitReports',
                    consolidateAll: false,
                    useDotNotation: false,
                    filePrefix: junitReportFile,
                    modifySuiteName: function (generatedSuiteName, suite) {
                        // this will produce distinct suite names for each capability,
                        // e.g. 'firefox.login tests' and 'chrome.login tests'
                        return browserName + ' ' + generatedSuiteName + ' ' + Date.now();
                    }
                });
                jasmine.getEnv().addReporter(junitReporter);
                jasmine.getEnv().addReporter({
                    specDone: function (result) {
                        var fs = require('fs-extra');
                        console.log(result);
                        if (result.status == 'failed') {
                            // var browserName = caps.get('browserName');
                            // console.log(caps);

                            return browser.takeScreenshot().then(function (png) {
                                var stream = fs.createWriteStream(__dirname + '/reports/screenshots/' + browserName + '-' + result.fullName + '.png');
                                stream.write(new Buffer(png, 'base64'));
                                stream.end();
                            });
                        }
                    }
                });
            })
        }).then(() => {
            var fs = require('fs-extra');


            browser.manage().window().maximize();
            browser.manage().timeouts().implicitlyWait(5000);
            return browser.getCapabilities().then(function (caps) {
                if (caps.get('browserName') == 'firefox') {
                    //browser.manage().timeouts().implicitlyWait(20000);
                    browser.ignoreSynchronization = true;
                } else {
                    return browser.manage().timeouts().implicitlyWait(0);
                }
            })
        });

    },


    onComplete: function () {
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();
        return require('./utilities/reportHelper').mergeJUnitReports(__dirname + '/reports/junitReports').then(function () {
            return capsPromise.then(function (caps) {
                browserName = caps.get('browserName');
                browserVersion = caps.get('version');


                var HTMLReport = require('protractor-html-reporter');

                testConfig = {
                    reportTitle: 'Test Execution Report',
                    outputPath: __dirname + '/reports',
                    screenshotPath: __dirname + '/reports/screenshots',
                    testBrowser: browserName,
                    browserVersion: browserVersion,
                    modifiedSuiteName: true,
                    screenshotsOnlyOnFailure: true
                };
                new HTMLReport().from(__dirname + '/reports/xml-results.xml', testConfig);
            });
        })
    }
};

