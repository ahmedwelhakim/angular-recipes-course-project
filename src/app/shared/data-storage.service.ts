import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { count, Subject, Subscription, map, tap } from 'rxjs';

const recipesUrl = 'https://ng-well-learning-default-rtdb.firebaseio.com/recipes.json';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  errors = new Subject<string>()
  storeData() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put(recipesUrl, recipes).subscribe({
      error: (err: HttpErrorResponse) => {
        this.errors.next(err.message);
      }
    })
  }
  fetchData() {
    const recipesData: Recipe[] = [];

    return this.http.get<Recipe[]>(recipesUrl).pipe(map((recipes) => {
      recipes.forEach(recipe => {
        recipe.ingredients = recipe.ingredients ? recipe.ingredients : [];
      })
      return recipes;
    })).pipe(tap((recipes) => {
      this.recipeService.setRecipes(recipes);
    }));
  }
}
