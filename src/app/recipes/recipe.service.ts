import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: "root" })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private _touched = false;
  private _recipes: Recipe[] = []  //[
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe('Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ])
  // ];
  getRecipes() {
    return this._recipes.slice();
  }
  getRecipe(index: number) {
    if (index >= this._recipes.length) {
      return null;
    }
    return this._recipes[index];
  }
  get length() {
    return this._recipes.length;
  }
  get touched() {
    return this._touched;
  }
  set touched(val) {
    val === true ? this._touched = true : this._touched;
  }
  updateRecipe(index: number, updatedRecipe: Recipe) {
    this._touched = true;
    this._recipes[index] = updatedRecipe;
    this.recipesChanged.next(this._recipes.slice());
  }
  addRecipe(newRecipe: Recipe) {
    this._touched = true;
    this._recipes.push(newRecipe);
    this.recipesChanged.next(this._recipes.slice());
  }
  addRecipes(newRecipes: Recipe[]) {
    this._touched = true;
    this._recipes.push(...newRecipes);
    this.recipesChanged.next(this._recipes.slice());
  }
  setRecipes(newRecipes: Recipe[]) {
    this._touched = true;
    this._recipes = [];
    this._recipes.push(...newRecipes);
    this.recipesChanged.next(this._recipes.slice());
  }
  deleteRecipe(index: number) {
    this._touched = true;
    this._recipes.splice(index, 1);
    this.recipesChanged.next(this._recipes.slice());
  }
  deleteAllRecipes() {
    this._touched = true;
    this._recipes = [];
    this.recipesChanged.next(this._recipes.slice());
  }
  getIndex(recipe: Recipe) {
    return this._recipes.indexOf(recipe);
  }
  get isEmpty() {
    return this._recipes.length === 0;
  }
}
