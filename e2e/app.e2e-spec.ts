import { Angularattack2017CowabungaPage } from './app.po';

describe('angularattack2017-cowabunga App', () => {
  let page: Angularattack2017CowabungaPage;

  beforeEach(() => {
    page = new Angularattack2017CowabungaPage();
  });

  it('should display message saying cowabunga works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('cowabunga works!');
  });
});
