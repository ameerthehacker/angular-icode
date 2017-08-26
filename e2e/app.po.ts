import { browser, by, element } from 'protractor';

export class AngluarIcodePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ic-root h1')).getText();
  }
}
