import { Component,OnInit,ViewChild } from '@angular/core';
import { NewCalorieEntryComponent } from '../new-calorie-entry/new-calorie-entry.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { RecipesService } from '../recipes.service';
@Component({
  selector: 'calories-today',
  templateUrl: './calories-today.component.html',
  styleUrls: ['./calories-today.component.css']
})
export class CaloriesTodayComponent implements OnInit{
  name!: string;
  calories!: number;
  image!: string;
  recipes:{  name:string,calories:Number, image: string, description: string,rating:number }[] = [
  ];
  totalCalories = 950;
  calorieGoal = 2000;
  showNewEntryModal = false;

  addNewEntry() {
    this.recipes.push({ name: this.name, calories: this.calories, image: "",description:"",rating:0 });
    this.totalCalories += this.calories;
    this.name = '';
    this.calories = 0;
    this.image = '';
    this.showNewEntryModal = false;
  }
  constructor(private dialogRef: MatDialog,private recipesService: RecipesService){
  }
  async ngOnInit(): Promise<void> {
    this.recipes=await this.recipesService.getTodayCalories();
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
 openDialog(){
  this.dialogRef.open(NewCalorieEntryComponent)
 }
 
}
