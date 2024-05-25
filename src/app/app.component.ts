import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterOutlet } from "@angular/router";
import { TopToolbarComponent } from "./top-toolbar/top-toolbar.component";
import { SideNavbarComponent } from "./side-navbar/side-navbar.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TopToolbarComponent, SideNavbarComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  // showFiller = false;
  constructor() {}
}
