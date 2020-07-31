require('chromedriver');
var webdriver = require('selenium-webdriver');
const { By, Key, until } = require('selenium-webdriver');

const getAddress = async (companyName) => {
  let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  try {
    await driver.get('https://www.google.ca/maps');
    await driver.wait(until.elementLocated(By.className('tactile-searchbox-input')), 10000);
    await driver.findElement(By.className('tactile-searchbox-input')).sendKeys(`${companyName}`, Key.RETURN);
    await driver.wait(until.elementLocated(By.className('ugiz4pqJLAG__primary-text gm2-body-2')), 10000);
    let addressElement = await driver.findElement(By.className('ugiz4pqJLAG__primary-text gm2-body-2'));
    let address = await addressElement.getText();
    [street, city, provinceAndPostalCode] = [...address.split(', ')];
    let province = provinceAndPostalCode.split(' ')[0];
    let postalCode = provinceAndPostalCode.split(' ').slice(1).join(' ');
    console.log(`Street Address: ${street}`);
    console.log(`City: ${city}`);
    console.log(`Province: ${province}`);
    console.log(`Postal Code: ${postalCode}`);
  } catch (error) {
    console.log(error);
  } finally {
    await driver.quit();
  }
};

getAddress('Husky Energy')

