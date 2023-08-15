import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html'
})
export class SearchPokemonComponent implements OnInit {

  // {..."a".. "ab"... "abz"..."ab"}
  searchTerms = new Subject<string>();
  // {...pokemonList(a)...pokemonList(ab)...}
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
    ) {}

  ngOnInit() {
    
    this.pokemons$ = this.searchTerms.pipe(
      // {..."a"."ab"."abz".."ab"..."abc"......}
      debounceTime(300),
      // {..."ab"....."ab"..."abc"......}
      distinctUntilChanged(),
      // {..."ab"............"abc"......}
      switchMap(term => this.pokemonService.searchPokemonList(term))
      // if i use map :
      // {...Observable<"ab">..........Observable<"abc">......}
      // concatMap / mergeMap / switchMap, switchMap does the most recent research
      // if i use switchMap
      // {...pokemonList(ab)..........pokemonList(abc)......}
    );
  }

  search(term: string) {
    this.searchTerms.next(term);


  }

  goToDetails(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

}
