import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Joueur } from '../Joueur';
import { Carte } from '../carte';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  title = 'The game';
  public nbJoueurs: string;

  constructor(private route: ActivatedRoute) {}

  joueurs: Array<Joueur>= new Array<Joueur>();
  cartes: Array<Carte>= new Array<Carte>();

  ngOnInit() {
    this.nbJoueurs = this.route.snapshot.paramMap.get('nbJoueurs');
    this.beginGame();
  }

  

  public beginGame(){
    let gamePlayers: Array<string>;
    let gameCards: number;
    
    if(this.nbJoueurs == "4"){
      gamePlayers = ["sherlock","sherlock","moriarty","moriarty"];
      gameCards = 20;
    }else if(this.nbJoueurs == "5"){
      gamePlayers = ["sherlock","sherlock","sherlock","moriarty","moriarty"];
      gameCards = 25;
    }else if(this.nbJoueurs == "6"){
      gamePlayers = ["sherlock","sherlock","sherlock","moriarty","moriarty","moriarty"];
      gameCards = 30;
    }
    this.addJoueur(gamePlayers);
    
  }

  public addJoueur(gamePlayers: Array<string>){

    let joueursNumber: number = 0;

    gamePlayers.forEach(element => {
      joueursNumber ++;
      
      if(element == "sherlock"){
        
        let player: Joueur = new Joueur('sherlock',joueursNumber, true);
        this.joueurs.push(player);

      }else if(element == "moriarty"){
        
        this.joueurs.push(new Joueur('moriarty',joueursNumber, false));

      }
    });
    this.showGame();
  }

  public showGame(){
    this.joueurs.forEach(element => {
      alert(element.team);
    });
    
  }
}
