import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, Subject, take, tap } from 'rxjs';
import { User } from '../auth/auth.model';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import * as fromApp from './../store/app.reducer';

const recipesBaseUrl = 'https://ng-well-learning-default-rtdb.firebaseio.com/recipes/';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  userId: string = null;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) { }

  errors = new Subject<string>()
  storeData() {
    this.store.select('auth').pipe(take(1), map(userState => userState.user)).subscribe((user: User) => {
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
    return this.store.select('auth').pipe(take(1), map(userState => userState.user), exhaustMap(user => {
      console.log(user);

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
