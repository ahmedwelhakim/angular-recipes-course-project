import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';
import { RecipesComponent } from '../recipes.component';
import { RecipesResolver } from '../recipes.resolver';
import { AuthGuardGuard } from './../../auth/auth-guard.guard';
import { ItemNotFoundComponent } from './../item-not-found/item-not-found.component';
import { RedirectFirstRecipeResolver } from './../redirect-first-recipe.resolver';

const routes: Routes = [
  {
    path: '', component: RecipesComponent, resolve: [RecipesResolver], children: [
      { path: '', component: RecipeStartComponent, resolve: [RedirectFirstRecipeResolver] },
      { path: 'new', component: RecipeEditComponent },
      { path: 'item-not-found', component: ItemNotFoundComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
      { path: '**', component: ItemNotFoundComponent },
    ], canActivate: [AuthGuardGuard]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {

}
