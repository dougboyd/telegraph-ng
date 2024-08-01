import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { RouterOutlet } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AppState } from "../ngRx/core.state";
import { Store, select } from "@ngrx/store";
import {
  selectActiveVisualisation,
  selectNavVisible,
  selectVisualisations,
} from "../ngRx/ux/ux.selectors";
import { AsyncPipe, CommonModule, NgIf } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { CreateOpportunityComponent } from "../create-opportunity/create-opportunity.component";
import { AsyncSpinnerComponent } from "../async-spinner/async-spinner.component";
import {
  selectLoading,
  selectOpportunitiesForSelect,
  selectPersonsForSelect,
  selectReloadOpportunitiesAndPersons,
} from "../ngRx/telegraph/telegraph.selectors";
import { CreatePersonComponent } from "../create-person/create-person.component";
import { RelatePersonOpportunityComponent } from "../relate-person-opportunity/relate-person-opportunity.component";
import {
  setActiveVisualisation,
  setMainContentDimensions,
} from "../ngRx/ux/ux.actions";
import { Person } from "../ngRx/models/person.model";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Visualisation } from "../ngRx/models/visualisation";
import {
  getAllNodes,
  postRelationshipMapData,
} from "../ngRx/telegraph/telegraph.actions";
import { Opportunity } from "../ngRx/models/opportunity.model";

@Component({
  selector: "app-side-navbar",
  standalone: true,
  imports: [
    NgIf,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    RouterOutlet,
    AsyncPipe,
    CommonModule,
    MatIconModule,
    AsyncSpinnerComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: "./side-navbar.component.html",
  styleUrl: "./side-navbar.component.scss",
})
export class SideNavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("sidenav") sidenav!: MatSidenav;

  navVisible$!: Observable<boolean>;
  asyncSpinnerVisible$!: Observable<boolean>;
  asyncSpinnerVisible: boolean = false;

  visualisations$!: Observable<Visualisation[]>;

  subscriptions: Subscription[] = [];

  activeVisualisation$!: Observable<string>;
  activeVisualisation: string = "";
  activePerson: string = "";
  activeOpportunity: string = "";

  personsForSelect$!: Observable<Person[]>;
  opportunitiesForSelect$!: Observable<Opportunity[]>;

  constructor(
    public asyncSpinnerModal: MatDialog,
    private store: Store<AppState>,
    private elementRef: ElementRef,
    public dialog: MatDialog
  ) {}

  reloadOpportunitiesAndPersons$!: Observable<boolean>;
  /**
   * Run on init
   */
  ngOnInit(): void {
    this.listenForUxChanges();
    this.listenForAsyncSpinnerChanges();

    // Load the filter select Persons and Opportunity from all nodes
    // this.store.dispatch(getAllNodes());
    this.personsForSelect$ = this.store.pipe(select(selectPersonsForSelect));
    this.opportunitiesForSelect$ = this.store.pipe(
      select(selectOpportunitiesForSelect)
    );

    // Set the visualisations list for the drop down
    this.visualisations$ = this.store.pipe(select(selectVisualisations));
    this.activeVisualisation$ = this.store.pipe(
      select(selectActiveVisualisation)
    );
    this.activeVisualisation$.subscribe((visualisation: string) => {
      this.activeVisualisation = visualisation;
    });

    // listen for changes to the relationships and reload accordingly
    this.reloadOpportunitiesAndPersons$ = this.store.pipe(
      select(selectReloadOpportunitiesAndPersons)
    );
    this.reloadOpportunitiesAndPersons$.subscribe((reload: boolean) => {
      if (reload) {
        this.store.dispatch(getAllNodes());
        this.filterDataVisualisation();
      }
    });

    // setTimeout(() => {
    // this.filterDataVisualisation();
    // }, 2000);

    /*
    // for dev - open the relationship popup
    setTimeout(() => {
      this.openRelatePersonOpportunity();
    }, 1000);
     */

    // for dev - fire off the person and opportunity set
    /*
    setTimeout(() => {
      this.activePerson = "Tony Howell";
      this.activeOpportunity = "1DD";
      this.filterDataVisualisation();
    }, 1000);
    */

    //
    // this.visualisations$.subscribe((v) => {
    // if (v != undefined) {
    // v.forEach((vis) => {
    // this.visualisations.push(vis);
    // });
    // }
    // });
    /*
    setTimeout(() => {
      this.openRelatePersonOpportunity();
    }, 1000);
    */
  }

  /**
   * Listen for async spinner changes
   */
  listenForAsyncSpinnerChanges() {
    // Logic for listening to the store for changes to the loading spinner
    this.asyncSpinnerVisible$ = this.store.pipe(select(selectLoading));
    this.subscriptions.push(
      this.asyncSpinnerVisible$.subscribe((visible) => {
        this.asyncSpinnerVisible = visible;
      })
    );
  }

  /**
   * When the visualisation changes, push the result to the NGRX layer
   */
  setActiveVisualisationFromSelect() {
    // trigger the current visualisation
    this.store.dispatch(
      setActiveVisualisation({
        visualisationName: this.activeVisualisation,
      })
    );
  }

  /**
   * When the visualisation changes, push the result to the NGRX layer
   */
  filterDataVisualisation() {
    // trigger the current visualisation
    this.store.dispatch(
      postRelationshipMapData({
        filter: {
          opportunity: this.activeOpportunity,
          person: this.activePerson,
        },
      })
    );
    /*
     */
  }

  /**
   * Logic for listening to the store for changes to the side nav
   */
  listenForUxChanges() {
    // Logic for listening to the store for changes to the side nav
    this.navVisible$ = this.store.pipe(select(selectNavVisible));
    this.subscriptions.push(
      this.navVisible$.subscribe((navVisible) => {
        if (this.sidenav) {
          if (navVisible) {
            this.sidenav.open();
          } else {
            this.sidenav.close();
          }
        }
      })
    );
  }

  /**
   * Open the nav after the page has finished loading
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.sidenav.open();
    }, 100);

    // Set the dimensions of the data frame to the NGRX layer
    this.store.dispatch(
      setMainContentDimensions({
        height: this.elementRef.nativeElement.offsetHeight - 150,
        width: this.elementRef.nativeElement.offsetWidth - 300,
      })
    );
  }

  /**
   * Close all of the subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  /**
   * Opens the Create Opportunity modal
   */
  openCreateOpportunity(): void {
    const dialogRef = this.dialog.open(CreateOpportunityComponent);
  }

  /**
   * Opens the Create Person modal
   */
  openCreatePerson(): void {
    const dialogRef = this.dialog.open(CreatePersonComponent);
  }

  /**
   * Opens the Relate Person Opporuntity modal
   */
  openRelatePersonOpportunity(): void {
    const dialogRef = this.dialog.open(RelatePersonOpportunityComponent);
  }
}
