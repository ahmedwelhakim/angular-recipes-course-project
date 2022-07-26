import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientChangeSub: Subscription;
  subscription: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }
  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(appState => {
      this.ingredients = appState.ingredients;
    })


  }
  ngOnDestroy(): void {
    this.store.dispatch(ShoppingListActions.stopEdit());
    this.subscription.unsubscribe();
  }
  selectIngredient(index: number) {
    this.store.dispatch(ShoppingListActions.startEdit({ index: index }));
  }
}
