import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recpeService: RecipeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.recpeService.getRecipes().length === 0 && (!this.recpeService.touched))
      return this.dataStorageService.fetchData();
    else
      return this.recpeService.getRecipes();
  }
}
