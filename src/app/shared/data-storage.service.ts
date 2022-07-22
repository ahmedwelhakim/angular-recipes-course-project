import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, Subject, take, tap } from 'rxjs';
import { User } from '../auth/auth.model';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';

const recipesBaseUrl = 'https://ng-well-learning-default-rtdb.firebaseio.com/recipes/';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  userId: string = null;

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  errors = new Subject<string>()
  storeData() {
    this.authService.user.pipe(take(1)).subscribe((user: User) => {
      this.userId = user.id;
      if (this.userId !== null) {
        const recipesUrl = recipesBaseUrl + user.id + '.json'
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.http.put(recipesUrl, recipes).subscribe({
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.errors.next(err.message);
          }
        })
      }
    })

  }
  fetchData() {
    console.log('fetching');
    let userId: string;
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      userId = user === null ? null : user.id;
      const recipesUrl = recipesBaseUrl + user.id + '.json';
      return this.http.get<Recipe[]>(recipesUrl);
    }), map(data => {
      const recipes: Recipe[] = data;
      if (recipes !== null) {
        recipes.forEach(recipe => {
          recipe.ingredients = recipe.ingredients ? recipe.ingredients : [];
        },)
      }
      return recipes;
    }), tap((recipes) => {
      if (recipes !== null) {
        this.recipeService.setRecipes(recipes);
      } else {
        this.recipeService.touched = true;
      }
    }));
  }
}
