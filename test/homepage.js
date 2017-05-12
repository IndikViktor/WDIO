/**
 * Created by viktori on 4/24/2017.
 */
var assert = require('assert');
var utils = require('./../utils');

describe('Home page', function() {
    it('should have the right title', function() {
        browser.windowHandleMaximize(['current']);
        browser.url('/');
            var title = browser.getTitle();
            assert.equal(title, 'NAME - Online Casino that Allows You to Play Your Way - NAME');
        });

                                    /*LOGIN PART*/

    it('should be possible to open login form', function () {
        browser.waitForVisible('.btn_action_login', 5000);
        browser.click('.btn_action_login');
            var rememberMe = browser.getText(".field_name_remember-me");
            assert.equal(rememberMe, 'Remember me');
        });

    it('should be possible to close login form', function () {
        browser.click('.fn-close');
        browser.pause(2000)
            var loginPopup = browser.isVisible('.popup_type_login');
            assert.equal(loginPopup, false);
        });

    it('should be possible to login', function () {
        browser.click('.btn_action_login');
        browser.setValue('[name=userName]','USER2618');
        browser.setValue('[name=password]','Password1');
        browser.click('.btn_type_popup-login');
        browser.pause(1000)
            var username = browser.getText('.main-header__user-name--name');
            assert.equal(username, 'USER2618');
        });

    it('should be possible to logout', function () {
        browser.click('.btn_type_logout');
        browser.click('.fn-accept');
        browser.pause(1000)
            var loginButton = browser.isVisible('.btn_action_login');
            assert.equal(loginButton, true);
        });

                                    /*REGISTRATION PART*/

    it('should be possible to open registration form', function () {
        browser.click('.btn_action_sign-up');
        browser.pause(1000)
            var registerTitle = browser.getText(".registration__title-container");
            assert.equal(registerTitle, 'Registration');
        });

    it('should be possible to register', function () {

                //First step
        browser.click('.btn_action_sign-up');
        browser.pause(1000)
        browser.setValue('[name=firstname]','testName');
        browser.setValue('[name=lastname]','testLastName');
        browser.pause(500)
        browser.selectByIndex('#day', 1);
        browser.selectByIndex('#month', 1);
        browser.selectByIndex('#year', 10);
        browser.setValue('[name=email]','test@NAME.com');
        browser.click('.fn-next');

                //Second step
        browser.setValue('[name=address]','testAddress');
        browser.setValue('[name=city]','testCity');
        browser.selectByIndex('#countryCode', 74);
        browser.selectByIndex('.default', 3);
        browser.setValue('[name=zip]','12345');
        browser.setValue('[name=cellphone]','+491234567890');
        browser.click('.fn-next');

                //Third step
        var randomUser = utils.makeid();
        browser.setValue('[name=userName]', 'USER' + randomUser);
        browser.setValue('[name=password]', 'Password1');
        browser.setValue('[name=passwordVerify]', 'Password1');
        browser.selectByIndex('.fn-currency', 3);
        browser.click('#terms-checkbox');
        browser.click('.btn_type_register');
        browser.pause(2000)
                //Verify that "My Promotions" page is opened after registration.
            var promotionTitle = browser.getTitle();
            assert.equal(promotionTitle, 'My Promotions - NAME');
                //Verify  that user is logged in after registration
            var logoutbtn = browser.isVisible('.btn_type_logout');
            assert.equal(logoutbtn, true);
        });
});