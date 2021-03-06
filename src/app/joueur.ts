import { Carte } from './carte';

export class Joueur {
    constructor(public team?: string, public JoueurNumber?: number) { }

    deck: Array<Carte>= new Array<Carte>();

    public addCarte(card: Carte){
        this.deck.push(card);
    }

    public returnCarte(){
        return this.deck;
    }
}