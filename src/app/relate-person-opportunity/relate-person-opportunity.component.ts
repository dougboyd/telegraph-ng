import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  OnInit,
} from "@angular/core";
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { AppState } from "../ngRx/core.state";
import { Store } from "@ngrx/store";
import { createPerson, loadPersons } from "../ngRx/telegraph/telegraph.actions";
import { CustomValidators } from "../custom-validators.validator";

@Component({
  selector: "app-relate-person-opportunity",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: "./relate-person-opportunity.component.html",
  styleUrl: "./relate-person-opportunity.component.css",
})
export class RelatePersonOpportunityComponent implements OnInit {
  // name: string = "";
  formGroup!: FormGroup;
  // post: any = "";

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RelatePersonOpportunityComponent> // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  /**
   * create the form, load all of the persons and opportunities into the database
   */
  ngOnInit(): void {
    this.createForm();

    setTimeout(() => {
      this.store.dispatch(loadPersons());
    });

    //
    // setTimeout(() => {
    // this.createPerson(this.formGroup.value);
    // }, 1000);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: ["Jeff Goldblum", Validators.required],
      jobTitle: ["Actor", Validators.required],
      rank: ["King"],
      archtisFriendly: [
        "8",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          CustomValidators.numberBetween10AndNegative10,
        ],
      ],
    });
  }

  /**
   * Handles the submit from the create opportunity modal
   */
  createPerson(formSubmit: any): void {
    this.store.dispatch(createPerson({ person: formSubmit }));
    this.dialogRef.close();
  }
}
