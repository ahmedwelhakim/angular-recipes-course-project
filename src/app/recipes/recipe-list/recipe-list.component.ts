import { DataStorageService } from './../../shared/data-storage.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[];
  recpChangedSubs:Subscription;
  fetching = true;
  constructor(private recipeService:RecipeService,private dataStorageService:DataStorageService) { }

  ngOnInit(): void {
    this.recpChangedSubs = this.recipeService.recipesChanged.subscribe(recipesArr=>{
      this.recipes = recipesArr;
    })
    this.dataStorageService.fetchData().subscribe(
      recipes => this.fetching =false
    );
    this.recipes = this.recipeService.getRecipes();
  }
  ngOnDestroy(): void {
    this.recpChangedSubs.unsubscribe();
  }
}
