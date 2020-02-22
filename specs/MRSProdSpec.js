let Login = require('../pages/LoginPage');
let credentials = require('./../testdata/Credentials.json');
let userDetails = credentials.users[browser.params.env].Examinee["0"];
describe("Login to MCAT MRS application", function () {
    let loginPage;
    beforeAll(function () {
        browser.get("https://apps.aamc.org/mrs/#");
        // browser.get(browser.params.appUrl);
        // expect(browser.getTitle()).toEqual('OneAAMC');
      

    });

    it('Login to application', function () {
        loginPage = new Login({});
        loginPage.waitForPage();
        loginPage.enterUserName(userDetails.userName);
        loginPage.enterPassword(userDetails.password);

        loginPage.clickSignInButton();

    });
    it('MRS Home Page Title Validation', function () {
        browser.sleep(3000);
        expect(browser.getTitle()).toEqual("Dashboard | MCAT Registration Service");

    });
    it('LogOut From application', function () {
        browser.sleep(3000);
        loginPage.signOut();
    });
});