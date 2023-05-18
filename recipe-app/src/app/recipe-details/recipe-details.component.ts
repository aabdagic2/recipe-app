import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { HttpClient } from '@angular/common/http';
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
  recipe!:{  title: string; image: string; description: string; rating:number;ingredients:{
    text: string,
    quantity: 0,
    measure: string}[];source:string }|undefined;
  constructor(private route: ActivatedRoute,private recipeService: RecipesService,private http:HttpClient) { }
isSaved:Boolean=false;
  async ngOnInit(): Promise<void> {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    var rec=await this.recipeService.getRecipe(this.recipeId);
    if(rec.length!=0){
    this.recipe=rec[0];
    var sr=await this.recipeService.getSavedRecipes();
    for(let i=0;i<sr.length;i++)
    if(rec[0].title==sr[i].title){
this.isSaved=true;
break;
    }
    console.log(this.recipe);}
  }
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

  saveRecipe() {
    const recipe: SavedRecipe = {
      name: 'Recipe Name',
      image: 'Recipe Image URL',
      description: 'Recipe Description',
      rating: 5
    };
if(this.isSaved!=true&&this.recipe!=null){
  recipe.name=this.recipe.title;
  recipe.image=this.recipe.image;
  recipe.description=this.recipe.description;
  recipe.rating=0;
    this.http.post('https://localhost:7079/api/savedrecipes', recipe).subscribe(
      () => {
        // Recipe saved successfully
        this.isSaved = true;
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );}
  }
  rateRecipe(rating: number): void {
    // Implement your logic to save the rating
    if(this.recipe!=null){
    const rateRecipe={name:"",rating:0};
    rateRecipe.name=this.recipe?.title;
    rateRecipe.rating=rating+1;
    console.log('Rated:', rating+1);
    this.http.put('https://localhost:7079/api/ratedrecipes', rateRecipe).subscribe(
      () => {
        // Recipe saved successfully
    
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
    }
  }
  caloriesToday(){
    var made=  {name:this.recipe?.title,
    image:this.recipe?.image,
    description:this.recipe?.description,
    rating:this.recipe?.rating,
   calories: Number(this.recipe?.description.split(',')[0])};
   console.log(made.calories);
   this.http.post('https://localhost:7079/create', made).subscribe(
      () => {
        // Recipe saved successfully
    console.log(made.calories);
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
}
