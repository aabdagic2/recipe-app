import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedRecipesComponent } from './saved-recipes-list/saved-recipes-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { CaloriesTodayComponent } from './calories-today/calories-today.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
const routes: Routes = [{ path: 'saved-recipes', component: SavedRecipesComponent },
{ path: '', component: RecipeListComponent },
{ path: 'calories-today', component: CaloriesTodayComponent },
{path: 'recipe-details/:id', component:RecipeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
