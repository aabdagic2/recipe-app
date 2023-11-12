import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarServiceService } from '../navbar-service.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService,private zone: NgZone,private route: ActivatedRoute, private navbarService: NavbarServiceService) {
    // Initialize services as needed
  }
success:boolean=false;
  async onLogin() {
    // Prepare the login data
    const loginData = {
      Email: this.email,
      Password: this.password,
    };
    
    // Send the data to the server using HttpClient or a service
    try {
      // Send the data to the server using HttpClient
      const response:any = await this.http.post('https://localhost:7178/api/UserManagement/login', loginData).toPromise();
      // Handle a successful login response
      if (response) {
          
        console.log(response);
       this.cookieService.set('token',JSON.stringify(response.token));
       this.cookieService.set('user', response.user.toString());
        this.success=true;
        this.navbarService.setLoggedIn();
        this.router.navigate(['']);
      }
    
    } catch (error) {
      // Handle login error
      this.error = 'Login failed. Please check your email and password.';
    }
   
  }
  redirect(){
    this.router.navigate(['/register']);
  }
}
