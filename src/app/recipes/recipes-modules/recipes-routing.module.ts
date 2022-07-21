import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';
import { RecipesComponent } from '../recipes.component';
import { RecipesResolver } from '../recipes.resolver';

const routes = [
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolver] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolver] },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {

}
