import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeItem:Recipe;
  constructor(private slService:ShoppingListService, private recipeService:RecipeService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params:Params)=>{
      this.recipeItem = this.recipeService.getRecipe(+params['id']);
    })

  }
  toShoppingList(){
    this.slService.addIngredients(this.recipeItem.ingredients);
  }
}
