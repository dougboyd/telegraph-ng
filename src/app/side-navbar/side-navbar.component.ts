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
import { toggleNavBar } from "../ngRx/ux/ux.actions";

@Component({
  selector: "app-side-navbar",
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    RouterOutlet,
    AsyncPipe,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: "./side-navbar.component.html",
  styleUrl: "./side-navbar.component.scss",
})
export class SideNavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("sidenav") sidenav!: MatSidenav;

  navVisible$!: Observable<boolean>;

  subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
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
  ngAfterViewInit() {
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
}
