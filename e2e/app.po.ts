import { browser, element, by } from 'protractor';

export class Angularattack2017CowabungaPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('cowabunga-root h1')).getText();
  }
}
