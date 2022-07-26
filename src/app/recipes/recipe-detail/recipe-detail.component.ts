import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeItem: Recipe;
  id: number;
  recipeChangedSubs: Subscription;
  constructor(
    private store: Store<fromApp.AppState>,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if (isNaN(this.id) || this.id >= this.recipeService.length) {
        this.router.navigate(['/recipes/item-not-found']);
      }
      else {
        this.recipeItem = this.recipeService.getRecipe(this.id);
      }
    })
    this.recipeChangedSubs = this.recipeService.recipesChanged.subscribe(recipes => {
      if (!this.recipeService.isEmpty) {
        this.id = Math.max(--this.id, 0);
        this.recipeItem = recipes[this.id];
        this.router.navigate(['..', this.id], { relativeTo: this.route });
      } else {
        this.router.navigate(['..'], { relativeTo: this.route });
      }
    })

  }
  toShoppingList() {
    this.store.dispatch(
      ShoppingListActions.addIngredients({
        ingredients: this.recipeItem.ingredients
      })
    );
  }
  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
  }
}
