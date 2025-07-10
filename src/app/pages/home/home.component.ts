import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../modal-pages/login/login.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private hasTriggeredLogin = false;

  constructor(
      private loginService: LoginService,
      private router: Router
  ) {}

  ngOnInit(): void {
    // Only trigger login modal if not already triggered
    if (!this.hasTriggeredLogin) {
      this.triggerLoginModal();
    }
  }

  private triggerLoginModal(): void {
    this.hasTriggeredLogin = true;

    this.loginService.openLoginModal().subscribe(result => {
      if (result) {
        console.log('Login successful:', result);
        // User logged in successfully
        // You can store auth state, redirect, or just continue on home page
        // For example:
        // this.authService.setAuthState(result);
        // this.router.navigate(['/dashboard']); // if you want to redirect after login
      } else {
        console.log('Login cancelled');
        // User cancelled login
        // You might want to show the modal again or handle this case
        // For now, we'll just stay on the home page
      }
    });
  }

  // Optional: Method to manually trigger login again
  public showLogin(): void {
    this.triggerLoginModal();
  }
}