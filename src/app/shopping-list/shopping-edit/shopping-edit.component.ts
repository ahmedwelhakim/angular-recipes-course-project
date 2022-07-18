import { Component, ContentChild, ElementRef, OnDestroy, OnInit, ViewChild, ViewRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppingListService:ShoppingListService) { }
  @ViewChild('form') form:NgForm
  editMode = false;
  indexOfSelectedIngr:number;
  selectIngrSubscription:Subscription;
  ngOnInit(): void {
    this.selectIngrSubscription = this.shoppingListService.ingredientEditting.subscribe((index:number)=>{
      let ingredient = this.shoppingListService.ingredients[index];
      this.form.form.patchValue({name:ingredient.name as string}) ;
      this.form.form.patchValue({amount: ingredient.amount as number});
      this.indexOfSelectedIngr = this.shoppingListService.ingredients.indexOf(ingredient)
      this.editMode = true;
    })
  }
  ngOnDestroy(): void {
    this.selectIngrSubscription.unsubscribe();
  }
  onSubmit(){
    if(this.editMode !== true){
    this.shoppingListService.addIngredient(new Ingredient(
        this.form.value.name, this.form.value.amount));
    }
    else{
      this.shoppingListService.updateIngredient(this.indexOfSelectedIngr,new Ingredient(
        this.form.value.name, this.form.value.amount));
    }
  }
  deleteIngredient(){
    if(this.indexOfSelectedIngr!=null && this.editMode == true){
      this.shoppingListService.deleteIngredient(this.indexOfSelectedIngr);
    }
  }
  clear(){
    this.editMode = false;
    this.form.reset();
  }
}
