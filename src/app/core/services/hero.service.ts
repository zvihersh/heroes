import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Hero } from 'src/app/models/hero-model';
import { Trainable } from 'src/app/models/trainable-interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService extends HttpService {

  private _heroes: Hero[];

  constructor(
    http: HttpClient
  ) {
    super(http, 'hero');
  }

  getHeroes(): Observable<Hero[]> {
    if (this._heroes) {
      return of(this._heroes);
    }
    return this.get<Hero[]>('all.json').pipe(map(res => {
      this._heroes = res.map(h => Hero.build(h));
      return this._heroes;
    }));
  }

  addHero(
    name: string,
    attacker: boolean,
    suitColors: string[],
    startingPower: number,
    trainerUuid: string
  ) {
    const hero: Hero = new Hero(
      name,
      attacker,
      '',
      new Date(),
      suitColors,
      startingPower,
      startingPower,
      true,
      trainerUuid
    );
    this._heroes.push(hero);
    return this.post('add', hero, {headers: new HttpHeaders({})});
  }
}
