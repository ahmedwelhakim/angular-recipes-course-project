import { DropdownDirective } from '../../shared/dropdown.directive';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeDetailComponent } from "../recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "../recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "../recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "../recipe-list/recipe-list.component";
import { RecipeStartComponent } from "../recipe-start/recipe-start.component";
import { RecipesComponent } from "../recipes.component";
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations:[
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeStartComponent,
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesRoutingModule
  ],
  exports:[]
})
export class RecipesModule{

}
