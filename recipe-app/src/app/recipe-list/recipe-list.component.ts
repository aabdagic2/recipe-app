import { Component } from '@angular/core';
//import { Recipe } from '../models/recipe.model';
import { RecipesService } from '../recipes.service';
@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes:{ title: string; image: string; description: string; rating: number; }[] = [
  ];
  constructor(private recipeService: RecipesService) { }

  async ngOnInit(): Promise<void> {
    this.recipes = await this.recipeService.getRecipes();
  }
 
  searchTerm: string = '';
  async updateItems(): Promise<void> {
 this.recipes=await this.recipeService.getRecipe(this.searchTerm);
  }
  get suggestions() {
    if (this.searchTerm === '') {
      return [];
    }
    return this.recipes.filter(recipe => recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
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
