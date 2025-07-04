import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;
    hidePassword = true;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<LoginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.isLoading = true;

            // Simulate login process
            const formData = this.loginForm.value;

            // TODO: Replace with actual authentication service
            console.log('Login attempt:', formData);

            // Close dialog and return form data
            this.dialogRef.close(formData);
        } else {
            this.markFormGroupTouched();
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    private markFormGroupTouched(): void {
        Object.keys(this.loginForm.controls).forEach(key => {
            this.loginForm.get(key)?.markAsTouched();
        });
    }

    getEmailErrorMessage(): string {
        const emailControl = this.loginForm.get('email');
        if (emailControl?.hasError('required')) {
            return 'Email is required';
        }
        if (emailControl?.hasError('email')) {
            return 'Please enter a valid email';
        }
        return '';
    }

    getPasswordErrorMessage(): string {
        const passwordControl = this.loginForm.get('password');
        if (passwordControl?.hasError('required')) {
            return 'Password is required';
        }
        if (passwordControl?.hasError('minlength')) {
            return 'Password must be at least 6 characters';
        }
        return '';
    }
}