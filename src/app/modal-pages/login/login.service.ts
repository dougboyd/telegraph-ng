import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginComponent } from './login.component';

export interface LoginResult {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private dialog: MatDialog) {}

    openLoginModal(): Observable<LoginResult | undefined> {
        const dialogRef: MatDialogRef<LoginComponent, LoginResult> = this.dialog.open(LoginComponent, {
            width: '400px',
            disableClose: true,
            autoFocus: true,
            data: {} // Pass any additional data if needed
        });

        return dialogRef.afterClosed();
    }
}