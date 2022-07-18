import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({providedIn:'root'})
export class ShoppingListService {

  constructor() { }
  private _ingredients =  [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientEditting = new Subject<number>();
  get ingredients(){
    return this._ingredients.slice();
  }
  addIngredient(ingredient:Ingredient){
    this._ingredients.push(ingredient);
    this.ingredientsChanged.next(this._ingredients.slice());
  }
  updateIngredient(indx:number,ingredient:Ingredient){
    this._ingredients[indx] = ingredient;
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  deleteIngredient(indx:number){
    this._ingredients.splice(indx,1);
    this.ingredientsChanged.next(this._ingredients.slice());
  }
  addIngredients(ingredients:Ingredient[]){
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next(this._ingredients.slice());
  }
}
