import { Component, OnInit } from '@angular/core';
import {RecipesService} from '../recipes.service'
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'saved-recipes-list',
  templateUrl: './saved-recipes-list.component.html',
  styleUrls: ['./saved-recipes-list.component.css']
})

export class SavedRecipesComponent implements OnInit {
  savedRecipes:{ title: string; image: string; dietLabels: string[]; recipeUrl:string;servings:number,time:number,calories:number }[]=[];
  searchTerm:string='';
  constructor(private recipeService: RecipesService,private cookieService:CookieService,private http:HttpClient) { }

  async ngOnInit() {
    this.savedRecipes = await this.recipeService.getSavedRecipes();
    console.log(this.savedRecipes);
  }
 async updateItems(){
  if(this.searchTerm=='')this.savedRecipes=this.savedRecipes;
  else{
  'https://localhost:7178/byTerm?term=strawberry'
  const res: any=await this.http.get('https://localhost:7178/byTerm?term='+this.searchTerm).toPromise();
  const rec: {  title: string; image: string; dietLabels: string[]; recipeUrl:string;servings:number,time:number,calories:number }[] = [];
  res.forEach(async (hit: any) => {
    console.log(hit);
    const label: string = hit.title;
    const image: string = hit.profileImage;
    let dietLabels: string[] = [];
    
    rec.push({ title: label, image: image, dietLabels: hit.dietLabels.split('/').map((label:any) => label.trim()), recipeUrl:hit.url,servings:hit.servings,time:hit.time,calories:hit.calories  });
  });
  this.savedRecipes=rec;
 }}
 async toggleSaveRecipe(recipe:{ title: string; image: string; dietLabels: string[]; recipeUrl:string;servings:number,time:number,calories:number }){
  
    const res: any=await this.http.delete('https://localhost:7178/api/SavedRecipes?userId='+this.cookieService.get('user')+'&url='+recipe.recipeUrl).toPromise();
    console.log(res);
    const indexToRemove = this.savedRecipes.findIndex(savedRecipe => savedRecipe.recipeUrl === recipe.recipeUrl);
  if (indexToRemove !== -1) {
    this.savedRecipes.splice(indexToRemove, 1);
  }
    }
  getStarRatingArray(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const starRatingArray = Array(5).fill(0);

    for (let i = 0; i < fullStars; i++) {
      starRatingArray[i] = 1;
    }

    if (hasHalfStar) {
      starRatingArray[fullStars] = 0.5;
    }
    return starRatingArray;
  }
}