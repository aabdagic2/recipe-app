import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../my-service.service';
import { NavbarServiceService } from '../navbar-service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  menuItems = [
    { title: 'Home', link: '' },
    { title: 'Library', link: '/saved-recipes' },
    { title: 'Diary', link: '/calories-today' }
  ];
  isLoggedIn:boolean=false;
  isLoaded:boolean=false;
  userFirstName:string=''
  userLastName:string=''
  profileImageData:string=''
  constructor(private router: Router,private http: HttpClient,private cookieService: CookieService,private authService: AuthService, private navbarService:NavbarServiceService){
    this.isLoggedIn = authService.isTokenValid();
   if(this.isLoggedIn==false){
    this.menuItems = [
    ];
   }
  }
  async ngOnInit(): Promise<void> {
    this.isLoggedIn = this.authService.isTokenValid();
    if(this.isLoggedIn==true){
      this.menuItems = [
        { title: 'Home', link: '' },
        { title: 'Library', link: '/saved-recipes' },
        { title: 'Diary', link: '/calories-today' }
      ];
     try{
      const response = await this.http.get<any>(`https://localhost:7178/api/AppUsers/${this.cookieService.get('user')}`).toPromise();
     if(response){
    
      this.userFirstName=response.name;
      this.userLastName=response.surname;
      const r=response.profileImage;
      await this.delay(1000);
      this.profileImageData=r;
      this.isLoaded=true;
     }
    }
     catch(error){

     }
    }
    this.navbarService.loggedInEvent.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      // You can add additional logic to update the navbar as needed
    });
  
  }
  showLogout: boolean = false;
  dropdown: boolean = false;
  toggleLogout() {
    console.log("Stiglo");
    this.showLogout = !this.showLogout;
  }
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  logout() {
     // Clear the authentication cookie
     this.cookieService.delete('token'); 
     this.router.navigate(['/login']);
     this.isLoggedIn=false;
    
  }
  redirectToLogin() {
    this.router.navigate(['/login']); // Replace 'login' with your actual login route
  }
  setIsLoggedIn(){
  this.isLoggedIn=true;
  }
}

