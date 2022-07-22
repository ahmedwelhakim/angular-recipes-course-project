import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { tap } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectFirstRecipeResolver implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recpeService: RecipeService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.recpeService.getRecipes().length === 0 && (!this.recpeService.touched))
      return this.dataStorageService.fetchData().pipe(tap(recipes => {
        (recipes !== null && recipes.length > 0) ? this.router.navigate(['/recipes', 0]) : null;
      }));
    else {
      const recipes = this.recpeService.getRecipes();
      recipes.length > 0 ? this.router.navigate(['/recipes', 0]) : null;
      return recipes;
    }


  }
}
