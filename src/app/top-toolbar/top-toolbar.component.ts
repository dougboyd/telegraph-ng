import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx/core.state';
import { toggleNavBar } from '../ngrx/ux/ux.actions';

@Component({
  selector: 'app-top-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './top-toolbar.component.html',
  styleUrl: './top-toolbar.component.scss',
})
export class TopToolbarComponent {
  showFiller = false;

  constructor(private store: Store<AppState>) {}
  // constructor() {}

  /**
   * Send a menu toggle to the ux store
   */
  toggleMenu() {
    this.store.dispatch(toggleNavBar());
  }
}
