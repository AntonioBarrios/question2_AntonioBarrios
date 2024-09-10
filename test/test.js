const {Builder, By} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')


const HOST = 'http://localhost:4567'

describe('Flower garden', function () {
  let driver
  beforeAll(async () => {
    const screen = {width: 640, height: 480}
    const options = new chrome.Options();
    if (options.headless) {
      options.addArguments("--headless");
    }
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options.windowSize(screen)).build();
    await driver.get(HOST);
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should use flex display for the garden div', async () => {
    const garden = await driver.findElement(By.className("garden"))
    expect(await garden.getCssValue('display')).toEqual('flex')
  })

  it.each([0, 1, 2])('displays row %s flex', async (index) => {
    const row = (await driver.findElements(By.className('row')))[index]
    expect(await row.getCssValue('display')).toEqual('flex')
  })

  it.each([0, 1, 2, 3, 4, 5, 6, 7, 8])('positions flower %s to the correct place', async (index) => {
    const circle = (await driver.findElements(By.className('circle')))[index]
    const flower = (await driver.findElements(By.className('flower')))[index]

    expect(await flower.getAttribute('offsetLeft')).toEqual(await circle.getAttribute('offsetLeft'))
    expect(await flower.getAttribute('offsetTop')).toEqual(await circle.getAttribute('offsetTop'))
  })
})