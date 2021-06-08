
const puppeteer = require('puppeteer');
const expect = require('chai').expect;

(async () => {

  let broswer = await puppeteer.launch({
    args: ['--start-maximized'],
    'headless': false
  })
  let page = await broswer.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.goto("https://www.Gamesmith.com", {
    waitUntil: 'load',
    timeout: 0

  });
  
  const [std] = await page.$x("//a[contains(text(), 'Studios')]");
  await std.click();
  const studioName = "TiMi Studios";
  const studioNameLower = studioName.toLowerCase();
  await page.waitForSelector("[name='studioName']");
  await page.click("[name='studioName']");
  await page.type("[name='studioName']", studioName);


  await page.waitForSelector("[title='Search']");
  await page.click("[title='Search']");

  try {
    await page.waitForSelector("._3wqf26PVc5IEd9QEV7L1LX");
    const nameConfirm = await page.$eval("._3wqf26PVc5IEd9QEV7L1LX", el => el.textContent.trim());
    const nameLowercase = nameConfirm.toLowerCase();
    expect(nameLowercase).to.equal(studioNameLower);
    await page.waitFor(3000);
    await page.click("._3wqf26PVc5IEd9QEV7L1LX");
    console.log(` "${studioName}" Studio Matched`);
  }
  catch (error) {
    throw (` "${studioName}" Studio didn't Match \n  ` + error);
  }
  await page.waitFor(6000);
  try{
  await page.waitForSelector("._3HBuYv77jDEl0T0epiPhrk");
  await page.waitFor(2000);
  await page.click("._3HBuYv77jDEl0T0epiPhrk");
  await page.waitForSelector('._3bCnj22s2G_ftNt-xjtbxx', { timeout: 10000 });
  await page.click('._3bCnj22s2G_ftNt-xjtbxx');

  //await waitFor(2000)
  
  await page.waitForSelector("[id='studio-jobs'] > div:nth-of-type(1) a");
  //await waitFor(1500)
  await page.click("[id='studio-jobs'] > div:nth-of-type(1) a");
  const firstJob = await page.$eval("[id='studio-jobs'] > div:nth-of-type(1) a", el => el.textContent.trim());

  console.log("Jobs Exists in this Stduio");
  console.log(`First job is : "${firstJob}" `);
  
  }
  catch(error){
  throw (`No Job Open By "${studioName}" Stduio`);
  }

  await page.waitFor(3000);
  broswer.close();

})();

  
