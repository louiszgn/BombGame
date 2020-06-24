import { Component, OnInit } from '@angular/core';
import { get } from 'http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  title = 'The game';
  // public nbJoueurs = get;

  constructor() { }

  ngOnInit() {
  }

}
