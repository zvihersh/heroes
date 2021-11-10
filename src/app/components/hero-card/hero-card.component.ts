import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../../models/hero-model';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero: Hero;

  @Output() train: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onTrain() {
    if (this.hero.canTrain) {
      this.train.emit();
    }
  }

}
