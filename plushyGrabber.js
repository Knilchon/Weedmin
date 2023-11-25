import puppeteer from "puppeteer";
import Pushbullet from 'pushbullet';
import {CronJob} from 'cron'

const pusher = new Pushbullet('o.3k5GkNqSALP8aj1DgVau0EvUFI6T8zxX');


var browser = null

const main = async () => {
    console.log("launching")
    browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true
});
    console.log("init page")
    const array = ['https://sanshee.com/en-de/products/rain-world-blue-lizard-glow-in-the-dark-plush','https://sanshee.com/en-de/products/rain-world-green-lizard-glow-in-the-dark-plush','https://sanshee.com/en-de/products/rain-world-pink-lizard-glow-in-the-dark-plush']
    const resArray = []
 
    const page = await browser.newPage();
    console.log("loading page 0")
    await page.goto(array[0])
    console.log("getting button")
    const button = await page.$('[class="product-form__add-button button button--disabled"]')
    resArray.push(button ? false : true)

    const page2 = await browser.newPage();
    console.log("loading page 1")
    await page2.goto(array[1])
    console.log("getting button")
    const button2 = await page2.$('[class="product-form__add-button button button--disabled"]')
    resArray.push(button2 ? false : true)

    const page3 = await browser.newPage();
    console.log("loading page 2")
    await page3.goto(array[2])
    console.log("getting button")
    const button3 = await page3.$('[class="product-form__add-button button button--disabled"]')

    browser.close()

    resArray.push(button3 ? false : true)


    return resArray
}

const msg = async(data) => {
    const title = 'Notification Title';

    if(data.includes(true)){
        pusher.note('', title, "PLUSH AVAILABLE", (error, response) => {
            if (error) {
              console.error('Error sending notification:', error);
            } else {
              console.log('Notification sent successfully:', response);
            }
          });
    }else{
	console.log("nothing yet");
    }
}

const cronJob = new CronJob('0 */2 * * *', () => {main().then(data => {
    console.log("res:",data);
    msg(data)
})})


// Start the cron job
cronJob.start();
