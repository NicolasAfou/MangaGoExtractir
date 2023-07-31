import puppeteer from "puppeteer-extra";
import { setTimeout } from "timers/promises";
import { Page } from "puppeteer";
import { MangaModel } from "./mangaModel";
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

export class PuppeteerHelper {

    private userName : string;
    private password: string;
    private userId: string;

    public constructor(obj){
        this.userName = obj.userName;
        this.password = obj.password;
        this.userId = obj.userId;

    }

    public async initialize(){
        let userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36";
        // Launch the browser and open a new blank page
        puppeteer.use(StealthPlugin);
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        page.setUserAgent(userAgent);
    
        // Navigate the page to a URL
        await page.goto('https://www.mangago.me/home/accounts/login/?redir=https://www.mangago.me/',{waitUntil: 'networkidle0',});
    
        // Set screen size
        await page.setViewport({width: 1080, height: 1024});
    
        // Type into search box
        await page.type('#email', this.userName);
        await page.type('#password', this.password);
        await page.waitForNavigation();
        
        
        //start extraction tasks
        let mangas : MangaModel[] = [];
        await page.goto(`https://www.mangago.me/home/people/${this.userId}/manga/3/?page=1`,{waitUntil: 'networkidle0',});
        await this.GetListPerPage(page,mangas);
    
    
        const numberOfPages = await page.evaluate('$("div.content > div.navigation > div.pagination")[0].attributes["total"].value') as number;
        console.log(numberOfPages);
        
        for (let index = 2; index <= numberOfPages; index++){
            await page.goto(`https://www.mangago.me/home/people/${this.userId}/manga/3/?page=${index}`,{waitUntil: 'networkidle0',});
            await this.GetListPerPage(page,mangas);
        }
        
        await browser.close();

        return mangas;
    };
    
    private async GetListPerPage(page: Page, mangaList: MangaModel[]){
        let mangaData = await page.evaluate(selector => {
            
            //private function to extract id from url
            const extractID = (str: string): string => {
                const match = str.match(/\/([^\/]+)\/?$/);
                if (!match) {
                    return "";
                }
                return match[1];
            };

            // get info inside container
            let mangasContainerInfo = document.querySelectorAll(selector);
            return Array.from(mangasContainerInfo,mangaContainer => {
                //title & ID
                let title = mangaContainer.querySelector('h3 > a').textContent;
                let id = extractID(mangaContainer.querySelector('h3 > a')?.attributes["href"]?.value ?? "");
                // author name & release Data
                let bookAuthorStr = mangaContainer.querySelector('h3 + div > div').textContent.split('|');
                let author = bookAuthorStr[1].trim();
                let releasedDate = bookAuthorStr[2].trim();
                // Evaluation
                let evaluation = mangaContainer.querySelector('#stars0')?.attributes["title"]?.value ?? "";
                return {title,id,author,releasedDate,evaluation};
            });
    
        },'div.content > div.manga > div.comment');
        mangaData.map(manga => mangaList.push(new MangaModel(manga)));
    }
    
}