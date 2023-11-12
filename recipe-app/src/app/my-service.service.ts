import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
//import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(private cookieService: CookieService, private router: Router) {}

  // Check if the token is valid
  isTokenValid(): boolean {
    const token = this.cookieService.get('token');
    console.log(token);
    if (!token) {
      console.log("Stiglo");
      return false;
    }

    // Decode and validate the token
    if (!this.isTokenExpired()) {
      console.log("Stiglo");
      return true;
      
    }

    // Token has expired or is invalid
    this.logout();
    return false;
  }

  // Log the user out
  logout(): void {
    // Clear the token from the client-side
    this.cookieService.delete('token');

    // Redirect the user to the login page
    this.router.navigate(['/login']);
  }

  private isTokenExpired(): boolean {
    // Decode the token using a JWT library (e.g., jsonwebtoken)
    // and check the expiration date (exp) in the decoded payload.
    // You can find a suitable library for decoding JWT tokens in Angular.

    const decodedToken = this.decodeToken(this.cookieService.get('token'));
    const currentTime = Date.now() / 1000;

    if (decodedToken && decodedToken.exp && decodedToken.exp >= currentTime) {

      return false; // Token is not expired
    }

    return true; // Token has expired or is invalid
  }

private decodeToken(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid token format');
      return null;
    }

    const payload = atob(parts[1]);
    return JSON.parse(payload);
  } catch (error) {
    console.error('Token decoding error:', error);
    return null;
  }
}
}
