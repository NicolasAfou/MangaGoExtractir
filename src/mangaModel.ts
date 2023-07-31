
export class MangaModel {
    id : string; // can be use to retrieve more info example : https://www.mangago.me/read-manga/${id}/
    author : string; //$('div.content > div.manga > div.comment > h3 + div > div')[0].innerText
    releasedDate : string; //$('div.content > div.manga > div.comment > h3 + div > div')[0].innerText
    title : string; //('div.content > div.manga > div.comment > h3 > a').value
    evaluation : string;
    intEvaluation : number;

    constructor(values: Partial<MangaModel>){
        Object.assign(this,values);
    }

    public setIntEvaluation(){
        this.intEvaluation = Evaluation[this.evaluation];
    }

}

enum Evaluation {
    "It's amazing" = 5,
    "Really like it" = 4,
    "Like it" = 3,
    "It's ok" = 2,
    "Don't like it" = 1,
    "" = 0,
}