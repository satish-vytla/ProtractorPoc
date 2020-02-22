let Page = require('./Page');
class Login extends Page {
    constructor(options) {
        super(options);
        // this.USERNAME = by.id('username');
        // this.PASSWORD = by.id('password');
        // this.SIGNIN_BTN = by.id("signIn");
        // New ONEAAMCLOGINPAGE
            this.USERNAME = by.id('mat-input-2');
            this.PASSWORD = by.id('password-field');
            this.SIGNIN_BTN= by.id("login-btn"); 
        this.DROPDOWNANGULAR8 = by.css('.account');
        this.LOGOUTANGULAR8 = by.buttonText('Logout');
        this.NameLink_BTN = by.id("dd-acount");
        this.PAGEREADY = this.USERNAME;
    }
    enterUserName(userName) {
        if (userName) {
            return element(this.USERNAME).sendKeys(userName);
        } else {
            return element(this.USERNAME).clear();
        }
    }

    enterPassword(password) {
        if (password) {
            return element(this.PASSWORD).sendKeys(password);
        } else {
            return element(this.PASSWORD).clear()
        }
    }

    clickSignInButton() {
        return element(this.SIGNIN_BTN).click();
    }
    clickSignOutButton() {
        browser.sleep(5000);
        element(this.DROPDOWNANGULAR8).click();
        browser.sleep(4000);
        return element(this.LOGOUTANGULAR8).click();
    }


}

module.exports = Login;