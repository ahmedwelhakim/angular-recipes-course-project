import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(private dataStorageService:DataStorageService, private recpeService:RecipeService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.recpeService.getRecipes().length ===0)
      return this.dataStorageService.fetchData();
    else
      return this.recpeService.getRecipes();
  }
}
