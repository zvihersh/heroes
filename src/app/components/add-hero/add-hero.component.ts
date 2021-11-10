import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent {

  heroForm: FormGroup;

  suitColorFormControls = new FormArray([], Validators.required);

  constructor(
    public dialogRef: MatDialogRef<AddHeroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.heroForm = new FormGroup({
       name: new FormControl('', [Validators.required]),
       attacker: new FormControl(false, [Validators.required]),
       startedTraining: new FormControl(new Date(), Validators.required),
       suitColors: this.suitColorFormControls,
       startingPower: new FormControl(0, [Validators.required])
    });
  }

  addHero() {
    console.log(this.heroForm.valid);
    if (this.heroForm.valid) {
      const values = this.heroForm.value;
      this.dialogRef.close({
        name: values.name,
        attacker: values.attacker,
        suitColors: values.suitColors,
        startingPower: values.startingPower
      });
    }
    console.log(this.heroForm);
  }

  addColor() {
    this.suitColorFormControls.push(new FormControl('#000000'));
  }
  
  removeColor(index: number) {
    this.suitColorFormControls.removeAt(index);
  }

}
