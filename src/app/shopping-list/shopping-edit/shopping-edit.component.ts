import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from './../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>) { }
  @ViewChild('form') form: NgForm
  editMode = false;
  indexOfSelectedIngr: number;
  subscription: Subscription;
  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.indexOfSelectedIngr = stateData.editedIngredientIndex;
        this.form.form.patchValue({ name: stateData.editedIngredient.name as string });
        this.form.form.patchValue({ amount: stateData.editedIngredient.amount as number });
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSubmit() {
    if (this.editMode !== true) {
      this.store.dispatch(ShoppingListActions
        .addIngredient({
          ingredient: new Ingredient(this.form.value.name, this.form.value.amount)
        })
      );
    }
    else {
      this.store.dispatch(ShoppingListActions
        .updateIngredient({
          ingredient: new Ingredient(
            this.form.value.name, this.form.value.amount),
        })
      );
    }
    this.clear();
  }
  deleteIngredient() {
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.clear();
  }
  clear() {
    this.store.dispatch(ShoppingListActions.stopEdit());
    this.editMode = false;
    this.form.reset();
  }
}
