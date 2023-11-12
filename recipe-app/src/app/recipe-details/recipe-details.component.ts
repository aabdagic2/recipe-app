import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { CookieService } from 'ngx-cookie-service';
export interface SavedRecipe {
  name: string;
  image: string;
  description: string;
  rating: number;
}
@Component({
  selector: 'recipe-details/:id',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeId!:string|null;
  savedId:number=-1;
  recipe!: {title: string; image: string; description: string; calories: number;dietLabels:string[];saved:boolean; url:string;servings:number; time:number;totalNutrients:any; ingredients:{
    text: string,
    quantity: 0,
    measure: string, isInCart: boolean}[],source: string,healthLabels:string[] };
  constructor(private route: ActivatedRoute,private recipeService: RecipesService,private http:HttpClient,private cookieService:CookieService) { }
isSaved:Boolean=false;
public chart: any;
  async ngOnInit(): Promise<void> {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    var rec=await this.recipeService.getRecipe(this.recipeId);
    if(rec.length!=0){
      this.recipe =rec[0];
      const response: any= await this.http.get('https://localhost:7178/recipe?userId='+this.cookieService.get('user')+'&url='+this.recipe.url.toString()).toPromise();
      if(response!=null){
       this.recipe.saved=true;
       this.savedId=response.id;
      }
      else{
        this.recipe.saved=false;
      }
    
      rec[0].ingredients.forEach(element => {
        this.recipe?.ingredients.push({
          text: element.text,
          quantity: element.quantity,
          measure: element.measure,
          isInCart: false
        });
      });
   /* var sr=await this.recipeService.getSavedRecipes();
    for(let i=0;i<sr.length;i++)
    if(rec[0].title==sr[i].title){
this.isSaved=true;
break;
    }*/
    this.createChart();
    }
  
  }

  addToShoppingCart(recipeUrl: string, ingredient: { text: string, quantity: number, measure: string, isInCart: boolean }) {
    const foundIngredient = this.recipe?.ingredients.find(ing => ing.text === ingredient.text);
    if (foundIngredient) {
      foundIngredient.isInCart = !foundIngredient.isInCart;
      if(foundIngredient.isInCart){
      {
        const rec=this.http.post('https://localhost:7178/api/ShoppingCarts/AddToShoppingCart',
       { recipe: {
    title: this.recipe.title,
    calories: this.recipe.calories,
    time: this.recipe.time,
    servings: this.recipe.servings,
    dietLabels: this.recipe.dietLabels.join('/'),
    profileImage: this.recipe.image,
    url: this.recipe.url,
    userId: this.cookieService.get('user')
        },
        cartItem: {
          food: ingredient.text,
          weight: 0,
          image: "",
          savedRecipeId: -1
        }
      }).toPromise();
      console.log(rec);
      }
    
    }
    else{
      const rec=this.http.delete('https://localhost:7178/api/ShoppingCarts?SavedId='+this.savedId+'&food='+ingredient.text);
    }
  }}
  
  getStarRatingArray(rating: number): { rating: number, i: number }[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const starRatingArray: { rating: number, i: number }[] = [];
  
    for (let i = 0; i < fullStars; i++) {
      starRatingArray.push({ rating: 1, i });
    }
  
    if (hasHalfStar) {
      starRatingArray.push({ rating: 0.5, i: fullStars });
    }
  
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      starRatingArray.push({ rating: 0, i });
    }
   console.log(starRatingArray);
    return starRatingArray;
  }
createChart(){
    console.log(this.recipe?.totalNutrients);
    const nutrientLabels = Object.keys(this.recipe?.totalNutrients)
    .filter(key => this.recipe?.totalNutrients[key].quantity !== 0)
    .map(key => this.recipe?.totalNutrients[key].label + " / " + this.recipe?.totalNutrients[key].unit);
  
  const nutrientValues = Object.keys(this.recipe?.totalNutrients)
    .filter(key => this.recipe?.totalNutrients[key].quantity !== 0)
    .map(key => Math.round(this.recipe?.totalNutrients[key].quantity));
    nutrientLabels.shift();
nutrientValues.shift();
  this.chart = new Chart("MyChart", {
    type: "pie",
    data: {
      labels: nutrientLabels,
      datasets: [
        {
          data: nutrientValues,
          backgroundColor: [
            'red',
            'blue',
            'green',
            'brown',
            'orange',
            'grey'
          ]
          ,
          hoverOffset: 4
        }
      ]
    },
    options: {
      aspectRatio: 2.5
    }
  });
}

  async saveRecipe() {
   this.recipe.saved=!this.recipe.saved;
   if(this.recipe.saved){
   const response: any = await this.http.post('https://localhost:7178/api/SavedRecipes/', {
    title: this.recipe.title,
    calories: this.recipe.calories,
    time: this.recipe.time,
    servings: this.recipe.servings,
    dietLabels: this.recipe.dietLabels.join('/'),
    profileImage: this.recipe.image,
    url: this.recipe.url,
    userId: this.cookieService.get('user')
  }).toPromise();
  console.log(response);}
  else{
    const res: any=await this.http.delete('https://localhost:7178/api/SavedRecipes?userId='+this.cookieService.get('user')+'&url='+this.recipe.url).toPromise();
  
  }
  }
  rateRecipe(rating: number): void {
  
  }
  toggleSaveRecipe(recipe:{ title: string; image: string; description: string; calories: number; dietLabels:string[];saved:boolean;source:string;url:string }){
    recipe.saved=!recipe.saved;

      }
  caloriesToday(){
    
  }
}
