import { WebpackTestPage } from './app.po';

describe('webpack-test App', () => {
  let page: WebpackTestPage;

  beforeEach(() => {
    page = new WebpackTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
