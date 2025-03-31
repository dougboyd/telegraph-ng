import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AppState } from '../../ngrx/core.state';
import { Store } from '@ngrx/store';
import { createPerson } from '../../ngrx/telegraph/telegraph.actions';
import { CustomValidators } from '../../custom-validators.validator';

@Component({
  selector: 'app-create-person',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    // MatDialogClose,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './create-person.component.html',
  styleUrl: './create-person.component.css',
})
export class CreatePersonComponent implements OnInit {
  // name: string = "";
  formGroup!: FormGroup;
  // post: any = "";

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreatePersonComponent> // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
    this.createForm();

    setTimeout(() => {
      this.createPerson(this.formGroup.value);
    }, 1000);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      firstName: ['Test First Name', Validators.required],
      lastName: ['Test Last Name', Validators.required],
      // jobTitle: ['', Validators.required],
      // rank: [''],
      // archtisFriendly: [
      // '',
      // [
      // Validators.required,
      // Validators.pattern('^[0-9]*$'),
      // CustomValidators.numberBetween10AndNegative10,
      // ],
      // ],
    });
  }

  /**
   * Handles the submit from the create opportunity modal
   */
  createPerson(formSubmit: any): void {
    this.store.dispatch(createPerson({ person: formSubmit }));
    console.log(formSubmit);
    this.dialogRef.close();
  }
}
