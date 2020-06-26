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
  public numJoueur: number;
  public deminageTotal: number;
  public deminageTrouve: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  joueurs: Array<Joueur>= new Array<Joueur>();
  deck: Array<Carte>= new Array<Carte>();

  ngOnInit() {
    this.nbJoueurs = this.route.snapshot.paramMap.get('nbJoueurs');
    this.beginGame();
  }


  public beginGame() {
    this.addJoueur();
    this.addCarte();
    this.distribCarte();
    this.game();
  }

  public addJoueur() {
    let teamM = Math.floor(parseInt(this.nbJoueurs, 10) / 2);
    let teamS = parseInt(this.nbJoueurs, 10) - teamM;
    let joueursNumber: number = 0;

    for (let i = 0; i < teamS; i++) {
      this.joueurs.push(new Joueur('Sherlock', joueursNumber));
      joueursNumber++;
    }
    for (let i = 0; i < teamM; i++) {
      this.joueurs.push(new Joueur('Moriarty', joueursNumber));
      joueursNumber++;
    }
  }

  public addCarte() {
    let gameCards: number = parseInt(this.nbJoueurs, 10) * 5;
    let carteDeminage: number = Math.floor(gameCards * 0.25);
    let carteLeurre: number = gameCards - (carteDeminage + 1);
    var i:number;
    this.deminageTotal = carteDeminage;

    for(i=carteDeminage; i > 0; i--) this.deck.push(new Carte('Déminage'));
    for(i=carteLeurre; i > 0 ; i--) this.deck.push(new Carte('Leurre'));
    this.deck.push(new Carte('Bombe'));
  }

  public distribCarte() {
    this.joueurs.forEach(element => {
      for(let i = 5; i > 0; i--) {
        let min = 0;
        let max = this.deck.length - 1;
        let rand = Math.floor(Math.random() * (max - min + 1) + min);

        element.addCarte(this.deck[rand]);
        this.deck.splice(rand, 1);
      }
    });
  }

  public game() {
    this.numJoueur = 0;
    this.deminageTrouve = 0;

    this.joueurs.forEach(element => {
      document.getElementById("game-container").innerHTML += '<div id="'+element.JoueurNumber+'" class="div-joueur col-4 border-1"></div>';

      this.cardReload(element);
    });

    document.getElementById(this.numJoueur.toString()).classList.add("active-joueur");
  }

  public selectedCard(e) {
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

    document.getElementById(joueur.JoueurNumber).innerHTML = ''; // Supprime les cartes existantes

    joueur.deck.forEach(carte => {
      document.getElementById(joueur.JoueurNumber.toString()).innerHTML += '<div id="'+joueur.JoueurNumber.toString()+'-'+compteur+'" class="div-carte">'+(compteur+1)+'</div>';
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