import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
// import { AuthService } from "../../auth/auth.service";
// import { AppState } from "../../ngRx/core.state";
import { select, Store } from '@ngrx/store';
// import { selectIsAuthenticated } from "../../ngRx/telegraph/telegraph.selectors";
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatCardModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}
}
