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
  get ingredients(){
    return this._ingredients.slice();
  }
  addIngredient(ingredient:Ingredient){
    this._ingredients.push(ingredient);
    this.ingredientsChanged.next(this._ingredients.slice());
  }
  addIngredients(ingredients:Ingredient[]){
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next(this._ingredients.slice());
  }
}
