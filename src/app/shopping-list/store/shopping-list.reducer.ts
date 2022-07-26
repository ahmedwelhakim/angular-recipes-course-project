import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 3),
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
  on(ShoppingListActions.addIngredient,
    (state, { ingredient }) => ({
      ...state,
      ingredients: [...state.ingredients, ingredient]
    })
  ),
  on(ShoppingListActions.addIngredients,
    (state, { ingredients }) => ({
      ...state,
      ingredients: [...state.ingredients, ...ingredients]
    })
  ),
  on(ShoppingListActions.updateIngredient,
    (state, { ingredient }) => {
      const ingredientsCopy = state.ingredients.slice();
      ingredientsCopy[state.editedIngredientIndex] = ingredient;
      return {
        ...state,
        ingredients: [...ingredientsCopy],
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
  ),
  on(ShoppingListActions.deleteIngredient,
    (state) => {
      const ingredientsCopy = state.ingredients.slice();
      ingredientsCopy.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: [...ingredientsCopy],
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    }
  ),
  on(ShoppingListActions.startEdit,
    (state, { index }) => {
      return {
        ...state,
        editedIngredient: state.ingredients[index],
        editedIngredientIndex: index
      }
    }
  ),
  on(ShoppingListActions.stopEdit,
    (state) => {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    }
  ),
);
