import {
  AfterViewInit,
  Component,
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
import { selectNavVisible } from "../ngRx/ux/ux.selectors";
import { AsyncPipe, CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { CreateOpportunityComponent } from "../create-opportunity/create-opportunity.component";
import { AsyncSpinnerComponent } from "../async-spinner/async-spinner.component";
import { selectLoading } from "../ngRx/telegraph/telegraph.selectors";
import { CreatePersonComponent } from "../create-person/create-person.component";
import { RelatePersonOpportunityComponent } from "../relate-person-opportunity/relate-person-opportunity.component";

@Component({
  selector: "app-side-navbar",
  standalone: true,
  imports: [
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    RouterOutlet,
    AsyncPipe,
    CommonModule,
    MatIconModule,
    AsyncSpinnerComponent,
  ],
  templateUrl: "./side-navbar.component.html",
  styleUrl: "./side-navbar.component.scss",
})
export class SideNavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("sidenav") sidenav!: MatSidenav;

  navVisible$!: Observable<boolean>;
  asyncSpinnerVisible$!: Observable<boolean>;
  asyncSpinnerVisible: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(
    public asyncSpinnerModal: MatDialog,
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {}

  /**
   * Run on init
   */
  ngOnInit(): void {
    this.listenForUxChanges();
    this.listenForAsyncSpinnerChanges();

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
