import { AngluarIcodePage } from './app.po';

describe('angluar-icode App', () => {
  let page: AngluarIcodePage;

  beforeEach(() => {
    page = new AngluarIcodePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to ic!!');
  });
});
