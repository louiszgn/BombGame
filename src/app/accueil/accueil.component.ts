import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  title = 'Time Bombe';
  public nbJoueurs = '4';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public beginGame(){
    this.router.navigate(['/game', this.nbJoueurs]);
  }
}
