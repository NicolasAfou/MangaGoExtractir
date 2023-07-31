import { PuppeteerHelper } from "./PuppeteerHelper";
import xlsx from 'xlsx';
import fs from 'fs';
import { json } from "stream/consumers";
import { MangaModel } from "./mangaModel";

main();

async function main(){
    // get settings
    const settings = JSON.parse(fs.readFileSync(`${__dirname}/settings.json`,'utf-8'));
    //build mangas list
    let mangas : MangaModel[];
    if(fs.existsSync(`${__dirname}/data/mangaData.json`)){
        let mangasData = JSON.parse(fs.readFileSync(`${__dirname}/data/mangaData.json`,'utf-8'));
        mangas = mangasData.map(mangaData => new MangaModel(mangaData));
    }
    else {
        mangas = await new PuppeteerHelper(settings).initialize();
    }
    mangas.forEach(m => {
        m.setIntEvaluation();
        console.log(m.id," ; ",m.author," ; ",m.releasedDate," ; ",m.title," ; ", m.evaluation," ; ", m.intEvaluation);

    });
    // write manga list in excel
    const workBook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(mangas)
    xlsx.utils.book_append_sheet(workBook,worksheet,'MangaGo');

    xlsx.writeFile(workBook,'manga.xlsx');
    xlsx.writeFile(workBook,'manga.csv',{bookType:'csv'});

    fs.writeFileSync(`${__dirname}/data/mangaData.json`,JSON.stringify(mangas));

};