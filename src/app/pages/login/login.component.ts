import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { AppState } from "../../ngRx/core.state";
import { select, Store } from "@ngrx/store";
import { selectIsAuthenticated } from "../../ngRx/telegraph/telegraph.selectors";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit, OnDestroy {
  isAuthenticated$!: Observable<boolean>;
  public loginValid = true;
  public username = "";
  public password = "";

  private _destroySub$ = new Subject<void>();
  private readonly returnUrl: string;

  constructor(
    private store: Store<AppState>,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/game";
  }

  public ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  public onSubmit(): void {
    this.loginValid = true;

    /*
    this._authService
      .login(this.username, this.password)
      .pipe(take(1))
      .subscribe({
        next: (_) => {
          this.loginValid = true;
          this._router.navigateByUrl("/game");
        },
        error: (_) => (this.loginValid = false),
      });
      */
  }
}
