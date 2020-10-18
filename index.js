require('dotenv').config()
const puppeteer = require('puppeteer');

async function bot(){
    const user = process.env.USER_TWITTER || process.env.EMAIL_TWITTER || 'username';
    const pass = process.env.PASS_TWITTER || 'password';

    async function msgGenerator(){
        let phrase;
        
        async function searchTrending(){
            const browser_trending = await puppeteer.launch({
                    headless: false
            });
            const page = await browser_trending.newPage();
            await page.goto('https://twitter.com/explore/tabs/trending', { waitUntil: 'networkidle2' });
      
            await page.waitForSelector('span[dir="ltr"]');
            const topic = await page.evaluate(() => {
                let x = document.querySelector('span[dir="ltr"]').innerText;
                if (x[0] == '#'){
                    x = x.replace('#', '');
                }
                return x;
            });
    
            await browser_trending.close();
            await page.waitForTimeout(2000);
            
            return topic;
        }
    
        async function searchPhrase(topic){
            const urlPensador = 'https://www.pensador.com/';
            const browser_phrase = await puppeteer.launch({
                headless: false
            });

            const page = await browser_phrase.newPage();
            search = "frase " + topic;

            await page.goto(urlPensador, { waitUntil: 'networkidle2' });
            await page.waitForTimeout(2000);
            await page.type('input[name="q"]', search, { delay: 30 });
            await page.click('[id="frmPesq2"] button[type="submit"]');

            await page.waitForTimeout(2000);
        
            phrase = await page.evaluate(() => {
                return document.querySelector('.thought-card p').innerText;
            }) || " ";
            
            await browser_phrase.close();
        }
    
        let topic = await searchTrending();
        await searchPhrase(topic);

        let msg = "O assunto do momento é: " + topic + ".\n" + " - " + phrase + ".";
        return msg;
    }
    
    async function twitter(msg){
        async function login(){
            await page.waitForSelector('input[name="session[username_or_email]"]');
            await page.type('input[name="session[username_or_email]"]', user, { delay: 30 });
            await page.type('input[name="session[password]"]', pass, { delay: 30 });
            await page.click('div[data-testid="LoginForm_Login_Button"]');
            await page.waitForTimeout(3000);
        }
    
        async function tweet(msg){
            await page.waitForSelector('div[class="notranslate public-DraftEditor-content"]');
            await page.type('div[class="notranslate public-DraftEditor-content"]', msg, { delay: 30 });
            await page.click('div[data-testid="tweetButtonInline" ', { delay: 30 });
        }        

        const urlTwitter = 'https://twitter.com/login?lang=pt';
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto(urlTwitter, { waitUntil: 'networkidle2' });

        await login();
        await tweet(msg);

        await page.waitForTimeout(3000);
        await browser.close();
    }

    let msgPost = await msgGenerator();
    await twitter(msgPost);
};

bot()