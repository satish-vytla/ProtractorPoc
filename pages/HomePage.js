let Page = require('./Page');
let Utils = require('./../utilities/utils');
let utils = new Utils();
let EC = protractor.ExpectedConditions;
class HomePage extends Page {
    constructor(options) {
        super(options);
        this.HEADING = by.css(".application-label span.hidden-sm-down");
        this.APPLICATION_LINK = by.className('.application-link');
        this.VISIBLE_AAMC_BOXES = by.css("div.aamc-box:not(.ng-hide)");
        this.USER_INFO_DASHBOARD = by.css("div.aamc-box.user:not(.ng-hide)");
        this.REGISTRATION_DASHBOARD = by.css("div.aamc-box.calendar:not(.ng-hide)");
        this.START_REGISTRATION_LINK = by.id('dashboard_start_registration_link');
        this.CONTINUE_REGISTRATION_LINK = by.id('dashboard_continue_registration_link');
        this.DASHBOARD_TITLES = by.css('div.tile h2');
        this.STARTREGDASHBOARD_PARA = by.css('#dashboard_exam_info_tile > p');
        this.EXAM_HISTORY_DASHBOARD = by.id('dashboard_test_history_tile');
        this.EXAM_HISTORY_META_LABELS = by.css('dl > dt');
        this.PERSONALINFODASHBOARD_TITLES = by.tagName('dt');
        this.PERSONAL_INO_META = by.css('#dashboard_personal_info_tile .row');
        this.QUICKLINKSINFO = by.css('#dashboard_quick_links_tile tile.m-b-2');
        this.DASHBOARD_ACTION_BUTTON = by.css('a.details');
        this.DASBOARD_PERSONAL_INFO_COMPLETE_BTN = by.id('dashboard_personal_information_button');
        this.APPOINTMENT_DATE = by.className('appointment-date');
        this.APPOINTMENT_TIME = by.className('appointment-time');
        this.RESCHEDULE_DASHBOARD = by.id('dashboard_reschedule_cancel_tile');
        this.RESCHEDULES = by.repeater('zone in $ctrl.dashboard.deadlineFees.zones');
        this.ZONE_TYPE = by.css('h3.ng-binding');
        this.ZONE_DEADLINE = by.className('zone-deadline');
        this.MONTH = by.id('month');
        this.DAY = by.id('day');
        this.YEAR = by.id('year');
        this.DOB_ACTION_BUTTON = by.css("form[name='iamForm.formHandle'] button");
        this.DOB_MODAL = by.id('eisSupplementModal');

        this.PAGEREADY = this.HEADING;

        this.DASHBOARD_CLASS = {
            USER_INFO: 'user',
            REGISTRATION: 'calendar',
            RESCHEDULE: 'calendar-minus'
        }
    }

    //Get getAppointmentDate Reg info from DashBoard
    getAppointmentDate() {
        return element(this.REGISTRATION_DASHBOARD).element(this.APPOINTMENT_DATE).getText();
    }
    //Get getAppointmentTime Reg info from DashBoard   
    getAppointmentTime() {
        return element(this.REGISTRATION_DASHBOARD).element(this.APPOINTMENT_TIME).getText();
    }


    clickPersonalInformationCompletedButton() {
        return element(this.DASBOARD_PERSONAL_INFO_COMPLETE_BTN).click();
    }

    getPersonalMetaData() {
        let self = this;
        let metaWrapper = element(this.PERSONAL_INO_META);
        return metaWrapper.all(this.PERSONALINFODASHBOARD_TITLES)
            .map((titleEle, index) => {
                let dataEle = metaWrapper.all(by.tagName('dd')).get(index);
                return {
                    label: titleEle.getText(),
                    value: dataEle.getText()
                };
            });
    }



    getUserInfoDashBoard() {
        utils.waitForElementByLocator(this.USER_INFO_DASHBOARD);
        return element(this.USER_INFO_DASHBOARD);
    }

    getDashBoard(dashboardClass) {
        return this.getDashBoards()
            .filter(dashboard => dashboard.getAttribute('class')
                .then(classes => classes.indexOf(dashboardClass) > -1)).first();
    }

    //Get Total Dashboard Count
    getDashBoards() {
        return element.all(this.VISIBLE_AAMC_BOXES);
    }

    getDashboardsCount() {
        return this.getDashBoards().count();
    }

    //Get Visbile titles on DashBoard

    getDashboardTitles() {
        let self = this;
        return this.getDashBoards().map(dashBoard =>
            dashBoard.element(self.DASHBOARD_TITLES).getText());

    }
    //Verify Exam Registration  Info on dashboard Before Registration"
    getStartRegDashboardPara() {
        let self = this;
        return element(self.STARTREGDASHBOARD_PARA).getText();

    }
    //Verify Exam Registration  Info on dashboard Before Registration"
    getExamHistoryDashboardTestsRem() {
        let examHistoryDashboard = element(this.EXAM_HISTORY_DASHBOARD);
        return examHistoryDashboard.all(this.EXAM_HISTORY_META_LABELS)
            .map((labelEle, index) => {
                let dataEle = examHistoryDashboard.all(by.tagName('dd')).get(index);
                return {
                    label: labelEle.getText(),
                    value: dataEle.getText()
                };
            })
    }


    //ExamRegistrationLink & ContinueExamRegistrationLink Button 
    clickStartExamRegistrationLink() {
        console.log('in Exam spec1111111');
        // return element(this.START_REGISTRATION_LINK).click();
        let startRegLink = element(this.START_REGISTRATION_LINK);
        utils.waitForElement(startRegLink);
        console.log('in Exam spec2222222222222');
        browser.wait(EC.elementToBeClickable(startRegLink), 5000);
        return startRegLink.click();
    }
    /* //temp
    clickSubmitOrderButton() {
        let processingDialog = element(this.PROCESSING_DIALOG);
        let nextButton = element(this.FORM).element(this.SUBMIT_ORDER_BUTTON);
        browser.executeScript("arguments[0].scrollIntoView();", nextButton.getWebElement());
        browser.wait(EC.elementToBeClickable(nextButton), 5000);
        return nextButton.click().then(() =>
            utils.waitForNotElement(processingDialog));
    } */

    clickContinueExamRegistrationLink() {
        // return element(this.CONTINUE_REGISTRATION_LINK).click();
        let startRegLink = element(this.CONTINUE_REGISTRATION_LINK);
        utils.waitForElement(startRegLink);
        browser.wait(EC.elementToBeClickable(startRegLink), 5000);
        return startRegLink.click();
    }

    clickDashboardActionButton(dashboardClass) {
        let dashboard = this.getDashBoard(dashboardClass);
        return dashboard.element(this.DASHBOARD_ACTION_BUTTON).click();
    }

    getQuickLinksOnDashboard() {
        let self = this;
        return element.all(self.QUICKLINKSINFO).getText();
    }

    getRescheduleTimes() {
        let self = this;
        let reschedules = element(this.RESCHEDULE_DASHBOARD).all(this.RESCHEDULES);
        return reschedules.map((reschedule, index) => {

            return {
                zone: reschedule.element(self.ZONE_TYPE).getText(),
                deadline: reschedule.element(this.ZONE_DEADLINE).getText(),
                index: index

            }
        })
    }

    clickRescheduleOrCancelButton() {
        return this.getDashBoard(this.DASHBOARD_CLASS.RESCHEDULE).element(this.DASHBOARD_ACTION_BUTTON).click();
    }

    openMonthDropDown() {
        return element(this.MONTH).click();
    }
    selectMonth(monthName) {
        let monthSelector = by.css("option[label='" + monthName + "']");
        return element(this.MONTH).element(monthSelector).click();
    }
    openDayDropDown() {
        return element(this.DAY).click();
    }
    selectDay(day) {
        let daySelector = by.css("option[label='" + day + "']");
        return element(this.DAY).element(daySelector).click();
    }
    openYearDropDown() {
        return element(this.YEAR).click();
    }
    selectYear(year) {
        let yearSelector = by.css("option[label='" + year + "']");
        return element(this.YEAR).element(yearSelector).click();
    }
    clickSave() {
        let self = this;
        return element.all(this.DOB_ACTION_BUTTON)
            .filter(button => button.getText().then(text => text === 'Save')).first().click()
            .then(() => utils.waitForNotElementByLocator(self.DOB_MODAL));
    }
    waitForDOBModal() {
        return utils.waitForElementByLocator(this.DOB_MODAL);
    }
}

module.exports = HomePage;