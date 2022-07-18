import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  ingredientChangeSub:Subscription;
  constructor(private shoppingListSrevice:ShoppingListService) { }
  ngOnInit(): void {
    this.ingredients = this.shoppingListSrevice.ingredients;
    this.ingredientChangeSub = this.shoppingListSrevice.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients = ingredients;
    });
  }
  ngOnDestroy():void{
    this.ingredientChangeSub.unsubscribe();
  }
  selectIngredient(index:number){
    this.shoppingListSrevice.ingredientEditting.next(index);
  }
}
