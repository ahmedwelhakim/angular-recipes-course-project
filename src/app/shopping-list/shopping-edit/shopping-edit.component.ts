import { Component, ContentChild, ElementRef, OnInit, ViewChild, ViewRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form') form:NgForm

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.shoppingListService.addIngredient(new Ingredient(
        this.form.value.name, this.form.value.amount));
  }
}
