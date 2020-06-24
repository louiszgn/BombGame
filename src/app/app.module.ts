import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';


//Configuration des routes
const routes: Routes = [
  { path: 'accueil', component: AppComponent },
  { path: 'game/:nbJoueurs', component: GameComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' }
];


@NgModule({
  declarations: [ // liste des composants / directives ... qu'on utilise dans ce module
    AppComponent,
    GameComponent
  ],
  imports: [ // liste des Modules qu'on utilise dans ce module
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent] // quel composant on démarre
})
export class AppModule { }
