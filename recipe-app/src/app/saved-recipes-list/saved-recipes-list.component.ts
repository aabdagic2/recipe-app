import { Component, OnInit } from '@angular/core';
import {RecipesService} from '../recipes.service'
@Component({
  selector: 'saved-recipes-list',
  templateUrl: './saved-recipes-list.component.html',
  styleUrls: ['./saved-recipes-list.component.css']
})

export class SavedRecipesComponent implements OnInit {
  savedRecipes:{ title: string; image: string; description: string; rating:number}[]=[];

  constructor(private recipeService: RecipesService) { }

  async ngOnInit() {
    this.savedRecipes = await this.recipeService.getSavedRecipes();
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