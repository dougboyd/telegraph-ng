import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { select, Store } from '@ngrx/store';
import { AppState } from './ngrx/core.state';
// import {
// getStandingData,
// postRelationshipMapData,
// } from './ngRx/telegraph/telegraph.actions';
import { Observable } from 'rxjs';
// import { IpService } from './ngRx/telegraph/ip-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopToolbarComponent, SideNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  reloadStandingData$!: Observable<boolean>;

  // showFiller = false;
  constructor(private store: Store<AppState>) {}
  // constructor() {}

  ngOnInit(): void {
    // this.store.dispatch(getStandingData());
    /*
    this.ipService.getIPAddress().subscribe((result: any) => {
      console.log(result.ip);
      console.log(result.ip);
      console.log(result.ip);
      console.log(result.ip);
    });
    */
  }
}
