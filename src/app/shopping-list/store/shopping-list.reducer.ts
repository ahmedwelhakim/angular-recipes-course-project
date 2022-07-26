import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import { addIngredient } from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};
export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, { ingredient }) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ingredient]
    }
  })
);
