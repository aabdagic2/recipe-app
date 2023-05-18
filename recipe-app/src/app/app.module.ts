import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from '../app/recipe-list/recipe-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SavedRecipesComponent } from '../app/saved-recipes-list/saved-recipes-list.component';
import { CaloriesTodayComponent } from './calories-today/calories-today.component';
import { NewCalorieEntryComponent } from './new-calorie-entry/new-calorie-entry.component';
import {MatDialogModule} from '@angular/material/dialog'
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component'
import { HttpClientModule } from '@angular/common/http';
const appRoutes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipes/:id', component: RecipeListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    NavbarComponent,
    SavedRecipesComponent,
    CaloriesTodayComponent,
    NewCalorieEntryComponent,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- Add this line
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
