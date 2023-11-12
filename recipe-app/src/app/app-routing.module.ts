import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedRecipesComponent } from './saved-recipes-list/saved-recipes-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { CaloriesTodayComponent } from './calories-today/calories-today.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [{ path: 'saved-recipes', component: SavedRecipesComponent },
{ path: 'home', component: RecipeListComponent },{ path: '', component: RecipeListComponent },
{ path: 'calories-today', component: CaloriesTodayComponent },
{path: 'recipe-details/:id', component:RecipeDetailsComponent},
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
