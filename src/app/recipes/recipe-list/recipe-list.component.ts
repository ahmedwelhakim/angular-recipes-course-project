import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from './../../shared/data-storage.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recpChangedSubs: Subscription;
  fetching = false;
  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.recpChangedSubs = this.recipeService.recipesChanged.subscribe(recipesArr => {
      this.recipes = recipesArr;
    })
    // if (this.recipeService.getRecipes().length === 0) {
    //   this.fetching = true;
    //   this.dataStorageService.fetchData().subscribe(
    //     recipes => {
    //       this.fetching = false
    //       this.recipes = recipes;
    //     }
    //   );
    // } else {
    //   this.recipes = this.recipeService.getRecipes();
    // }
    this.recipes = this.recipeService.getRecipes();
  }
  ngOnDestroy(): void {
    this.recpChangedSubs.unsubscribe();
  }
}
