import { Component, OnInit } from "@angular/core";
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import {
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
import { createOpportunity } from "../ngRx/telegraph/telegraph.actions";

@Component({
  selector: "app-create-opportunity",
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
  templateUrl: "./create-opportunity.component.html",
  styleUrl: "./create-opportunity.component.css",
})
export class CreateOpportunityComponent implements OnInit {
  // name: string = "";
  formGroup!: FormGroup;
  // post: any = "";

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateOpportunityComponent> // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
    this.createForm();
    // setTimeout(() => {
    // this.createOpportunity(this.formGroup.value);
    // }, 1000);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: ["", Validators.required],
    });
  }

  /**
   * Handles the submit from the create opportunity modal
   */
  createOpportunity(formSubmit: any): void {
    this.store.dispatch(createOpportunity({ opportunity: formSubmit }));
    this.dialogRef.close();
  }
}
