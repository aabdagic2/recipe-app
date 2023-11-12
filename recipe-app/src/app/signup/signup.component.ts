import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { router } from 'websocket';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  imageSrc: string = '';
  name:string=''
  lastName:string=''
  email:string=''
  username:string=''
  password:string=''
  calorieGoal:string=''
  profileImage:string=''
  error:string=''
  
  constructor(private renderer: Renderer2,private http: HttpClient,private cookieService: CookieService,private router: Router) {}
async onRegister(){

  const regData={name:this.name,surname:this.lastName,email:this.email,username:this.email,password:this.password,calorieGoal:this.calorieGoal,profileImage:this.imageSrc}
  try{const response:any = await this.http.post('https://localhost:7178/api/UserManagement/register', regData).toPromise();
    console.log(response);
  if(response.message){
      // Handle a successful login response
  
      this.router.navigate(['/login']);
    }}
   catch(error:any){
      if (error.status === 400 && error.error) {
        // The server returned a 400 Bad Request
        // You can access the error message from the server in error.error
        this.error='';
        if(Array.isArray(error.error))
        error.error.forEach((element:any) => {
          this.error+=element.description+" ";
          console.log(error.error);
        });
        else{
        console.log(error.error);
        this.error = error.error.title;}
      } else {
        // Handle other types of errors
        console.log(error.error);
        this.error = 'An unexpected error occurred.';
      }
    }
  
}
  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
}
