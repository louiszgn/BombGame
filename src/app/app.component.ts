import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  
export class AppComponent implements OnInit {
  title = 'Time Bombe';
  public nbJoueurs = '4';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public beginGame(){
    this.router.navigate(['/game', this.nbJoueurs]);
  }
}