import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Trainable } from 'src/app/models/trainable-interface';
import { Trainer } from 'src/app/models/trainer-model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerService extends HttpService {

  trainer: Trainer;

  constructor(http: HttpClient) {
    super(http, 'trainer');
  }
  
  getTrainer() {
    if (this.trainer) {
      of(this.trainer);
    }
    return this.get<Trainer>('user.json').pipe(tap(t => this.trainer = t));
  }

  train(t: Trainable) {
    if (this.trainer && t.trainerUuid === this.trainer.id) {
      t.train();
    }
  }
}
