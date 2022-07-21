import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { count, Subject, Subscription, map, tap, take, exhaustMap } from 'rxjs';
import { User } from '../auth/auth.model';

const recipesUrl = 'https://ng-well-learning-default-rtdb.firebaseio.com/recipes.json';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService implements OnInit, OnDestroy {

  userId: string = null;
  userSubscription: Subscription;
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  errors = new Subject<string>()
  storeData() {
    this.userSubscription = this.authService.user.pipe(take(1)).subscribe(user => {
      this.userId = user.id;
    })
    if (this.userId !== null) {
      const recipes: Recipe[] = this.recipeService.getRecipes();
      this.http.patch(recipesUrl, {[this.userId]: recipes}).subscribe({
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.errors.next(err.message);
        }
      })
    }
  }
  fetchData() {
    let userId:string;
    return this.authService.user.pipe(take(1),exhaustMap(user=>{
      userId = user === null? null : user.id;
      return this.http.get<{[str:string]:Recipe[]}>(recipesUrl)
    }),map(data=>{
      let recipes:Recipe[] = data[userId];
        recipes.forEach(recipe => {
          recipe.ingredients = recipe.ingredients ? recipe.ingredients : [];
        },)
        return recipes;
    }),tap((recipes) => {
      this.recipeService.setRecipes(recipes);
    }));
  }
}
