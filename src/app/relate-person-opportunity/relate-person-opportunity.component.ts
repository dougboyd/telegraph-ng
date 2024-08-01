import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  OnInit,
  model,
} from "@angular/core";
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CommonModule } from "@angular/common";
import { AppState } from "../ngRx/core.state";
import { Store, select } from "@ngrx/store";
import {
  createPerson,
  createRelationship,
  loadPersons,
} from "../ngRx/telegraph/telegraph.actions";
import { CustomValidators } from "../custom-validators.validator";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { Person } from "../ngRx/models/person.model";
import { Observable } from "rxjs";
import {
  selectOpportunitiesForSelect,
  selectPersonsForSelect,
  selectRelationshipTypesForSelect,
} from "../ngRx/telegraph/telegraph.selectors";
import { Opportunity } from "../ngRx/models/opportunity.model";
import { RelationshipType } from "../ngRx/models/relationship-type.model";

@Component({
  selector: "app-relate-person-opportunity",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
  ],
  templateUrl: "./relate-person-opportunity.component.html",
  styleUrl: "./relate-person-opportunity.component.css",
})
export class RelatePersonOpportunityComponent implements OnInit {
  // name: string = "";
  formGroup!: FormGroup;
  // post: any = "";

  sourceObject: string = "";
  targetObject: string = "";
  sourcePerson: string = "";
  targetPerson: string = "";
  sourceOpportunity: string = "";
  targetOpportunity: string = "";
  relationshipType: RelationshipType = {};

  relationshipTypeForSelect$!: Observable<RelationshipType[]>;
  personsForSelect$!: Observable<Person[]>;
  opportunitiesForSelect$!: Observable<Opportunity[]>;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RelatePersonOpportunityComponent> // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    // this.sourceObject = "person";
    // this.targetObject = "opportunity";
  }

  /**
   * create the form, load all of the persons and opportunities into the database
   */
  ngOnInit(): void {
    this.createForm();

    this.personsForSelect$ = this.store.pipe(select(selectPersonsForSelect));
    this.opportunitiesForSelect$ = this.store.pipe(
      select(selectOpportunitiesForSelect)
    );
    this.relationshipTypeForSelect$ = this.store.pipe(
      select(selectRelationshipTypesForSelect)
    );

    this.formGroup.valueChanges.subscribe((data: FormGroup) => {
      // this.sourceObject = data.get .get("sourceObject");
      this.sourceObject = this.formGroup.controls["sourceObject"].value;
      this.targetObject = this.formGroup.controls["targetObject"].value;
      this.relationshipType = this.formGroup.controls["relationshipType"].value;
      this.sourcePerson = this.formGroup.controls["sourcePerson"].value;
      this.sourceOpportunity =
        this.formGroup.controls["sourceOpportunity"].value;
    });

    /*
    setTimeout(() => {
      this.formGroup.controls["sourceObject"].setValue("Person");
      this.formGroup.controls["sourcePerson"].setValue("Tony Howell");
      this.formGroup.controls["relationshipType"].setValue({
        label: "INFLUENCES",
      });
      this.formGroup.controls["finalSignoff"].setValue(true);
      this.formGroup.controls["controlsFunding"].setValue(false);
      this.formGroup.controls["relationshipWarmth"].setValue(7);
      this.formGroup.controls["influenceFactor"].setValue(9);

      this.formGroup.controls["targetObject"].setValue("Opportunity");
      this.formGroup.controls["targetOpportunity"].setValue("9111 WNA");
      this.submitForm(this.formGroup.getRawValue());
    }, 1000);
     */
  }
  /**
   * Creates the reactive form on the page
   */
  createForm() {
    this.formGroup = this.formBuilder.group({
      sourceObject: [""],
      targetObject: [""],
      sourcePerson: [""],
      sourceOpportunity: [""],
      targetPerson: [""],
      targetOpportunity: [""],
      relationshipType: [""],
      finalSignoff: [false],
      controlsFunding: [false],
      relationshipWarmth: ["", [Validators.pattern("^[0-9]*$")]],
      influenceFactor: ["", [Validators.pattern("^[0-9]*$")]],
    });
  }

  /**
   * Takes a UPPER_CASE_THING and returns upper case thing
   * @param label
   * @returns
   */
  modifyRelationshipType(label: string): string {
    label = label.replaceAll("_", " ");
    const words: string[] = label.split(" ");
    label = "";
    words.forEach((word) => {
      label = label + this.capitalizeFirstLetter(word.toLowerCase()) + " ";
    });
    return label.trim();
  }

  /**
   * Take a word and capitalise the first letter
   * @param string
   * @returns
   */
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Handles the submit from the create opportunity modal
   */
  submitForm(formSubmit: any): void {
    console.log(formSubmit);
    this.store.dispatch(createRelationship({ formData: formSubmit }));
    this.dialogRef.close();
    /*
     */
  }
}
