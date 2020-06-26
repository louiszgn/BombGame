import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
  public numJoueur:number;
  public deminageTotal: number;
  public deminageTrouve: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  joueurs: Array<Joueur>= new Array<Joueur>();
  deck: Array<Carte>= new Array<Carte>();

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
    this.addCarte(gameCards);
    this.distribCarte();
    this.game();
    
  }

  public addJoueur(gamePlayers: Array<string>){

    let joueursNumber: number = 0;

    gamePlayers.forEach(element => {
      if(element == "sherlock"){
        
        let player: Joueur = new Joueur('sherlock',joueursNumber);
        this.joueurs.push(player);

      }else if(element == "moriarty"){
        
        this.joueurs.push(new Joueur('moriarty',joueursNumber));

      }

      joueursNumber ++;
    });
  }

  public addCarte(gameCards: number){
    
  let carteDeminage: number = Math.floor(gameCards*0.25);
  let carteLeurre: number = gameCards - (carteDeminage+1);
  var i:number ;
  this.deminageTotal = carteDeminage;

  for( i=carteDeminage ; i> 0 ; i-- ) {
      let card: Carte = new Carte('Déminage');
      this.deck.push(card);
  }

  for( i=carteLeurre ; i> 0 ; i-- ) {
    let card: Carte = new Carte('Leurre');
    this.deck.push(card);
  }

  let card: Carte = new Carte('Bombe');

  this.deck.push(card);
  }

  public distribCarte(){
    this.joueurs.forEach(element => {
      let i: number;
      for(i = 5; i>0;i--){
        let min = 0;
        let max = this.deck.length - 1;
        let rand = Math.floor(Math.random() * (max - min +1) + min);
        element.addCarte(this.deck[rand]);
        this.deck.splice(rand, 1);
      }
    });
  }

  public game(){
    this.numJoueur = 0;
    this.deminageTrouve = 0;

    this.joueurs.forEach(element => {
      document.getElementById("game-container").innerHTML += '<div id="'+element.JoueurNumber+'" class="div-joueur col-4 border-1"></div>';

      this.cardReload(element);
    });

    document.getElementById(this.numJoueur.toString()).classList.add("active-joueur");
  }

  public selectedCard(e){
    let selectedPlayer = e.target.parentNode.id;

    if(selectedPlayer == this.numJoueur) return; // Ne fais rien si la carte séléctionnée appartient au joueur actuel

    let cardInfos = e.target.id.split('-'); // [0] = Id du joueur ||||| [1] = Position de la carte
    let cardName = this.joueurs[cardInfos[0]].deck[cardInfos[1]].nom;
    this.joueurs[cardInfos[0]].deck.splice(cardInfos[1], 1);

    this.cardReload(this.joueurs[cardInfos[0]]);

    alert("C'était une carte "+cardName+" !");

    document.getElementById(this.numJoueur.toString()).classList.remove("active-joueur");
    this.numJoueur = cardInfos[0];
    document.getElementById(this.numJoueur.toString()).classList.add("active-joueur");

    this.checkEndGame(cardName);
  }

  public cardReload(joueur) {
    let compteur: number = 0;

    document.getElementById(joueur.JoueurNumber).innerHTML = '';

    joueur.deck.forEach(carte => {
      // document.getElementById(element.JoueurNumber.toString()).innerHTML += '<div class="div-carte" (click)="selectedCard($event)">'+ carte.nom+'</div>';(compteur+1)
      document.getElementById(joueur.JoueurNumber.toString()).innerHTML += '<div id="'+joueur.JoueurNumber.toString()+'-'+compteur+'" class="div-carte">'+carte.nom+'</div>';
      compteur++;
    });
  }

  public checkEndGame(cardName) {
    let team: string;
    let end: boolean = false;
    let msg: string = "";

    if (cardName == 'Déminage') this.deminageTrouve++;
    if (this.deminageTrouve === this.deminageTotal) {
      msg += "Toutes les cartes Déminage ont été trouvées !";
      team = "Sherlock";
      end = true;
    }

    if (cardName == 'Bombe') {
      msg += "La carte Bombe a été trouvée !";
      team = "Moriarty";
      end = true;
    }

    if (end === true) {
      msg += "\r\nL'équipe " +team+ " a gagnée !";
      alert(msg);

      this.router.navigate(['']);
    }
  }
}