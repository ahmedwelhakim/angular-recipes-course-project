import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input()recipeItem:Recipe;
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
  }
  toShoppingList(){
    this.slService.addIngredients(this.recipeItem.ingredients);
  }
}
