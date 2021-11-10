import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HeroService } from 'src/app/core/services/hero.service';
import { TrainerService } from 'src/app/core/services/trainer.service';
import { Trainer } from 'src/app/models/trainer-model';
import { Hero } from '../../models/hero-model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddHeroComponent } from '../add-hero/add-hero.component';

@Component({
  selector: 'app-all-heroes',
  templateUrl: './all-heroes.component.html',
  styleUrls: ['./all-heroes.component.scss']
})
export class AllHeroesComponent implements OnInit {

  heroes: Hero[] = [];
  myHeroes: Hero[] = [];
  trainer: Trainer;

  constructor(
    private heroService: HeroService,
    private trainerService: TrainerService,
    private authService: AuthService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.trainerService.getTrainer().subscribe(trainer => {
      this.trainer = trainer;
      this.refreshHeroes(this.trainer);
    });
  }

  train(hero: Hero) {
    this.trainerService.train(hero);
  }

  addHero(hero: any) {
    console.log(hero);
    this.heroService.addHero(
      hero.name,
      hero.attacker,
      hero.suitColors,
      hero.startingPower,
      this.trainer.id
    );
    this.refreshHeroes(this.trainer);
  }

  refreshHeroes(trainer: Trainer) {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes.sort((o1, o2) => o2.currentPower - o1.currentPower);
      this.heroes.forEach(h => h.canTrain = h.trainerUuid === trainer.id);
      this.myHeroes = this.heroes.filter(h => h.trainerUuid === trainer.id /*trainer.heroes.includes(h.guid)*/);
    });
  }

  logout() {
    this.authService.logout();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddHeroComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.addHero(result);
    });
  }

}
