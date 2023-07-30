import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `Welcome to {{pokemons}}!`
})
export class AppComponent {
  pokemons = ['pikachu', 'salamèche', 'carapuce'];
}
