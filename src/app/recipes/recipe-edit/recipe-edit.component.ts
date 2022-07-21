import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  ingredients: FormArray;

  ngOnInit(): void {
    this.initRecipeForm();
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initRecipeForm();
    });
  }
  initRecipeForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    this.ingredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      recipe.ingredients.forEach(ingr => {
        this.ingredients.push(new FormGroup({
          'name': new FormControl(ingr.name, [Validators.required]),
          'amount': new FormControl(ingr.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
        }))
      });
      this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName, [Validators.required]),
        'url': new FormControl(imagePath, [Validators.required]),
        'description': new FormControl(description, [Validators.required]),
        'ingredients': this.ingredients
      });
    } else {
      this.ingredients.push(new FormGroup({
        'name': new FormControl('', [Validators.required]),
        'amount': new FormControl('', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
      }));
      this.recipeForm = new FormGroup({
        'name': new FormControl('', [Validators.required]),
        'url': new FormControl('', [Validators.required]),
        'description': new FormControl('', [Validators.required]),
        'ingredients': this.ingredients
      });
    }
  }
  addIngredient() {
    let ingrFromGroup = this.recipeForm.get('ingredients') as FormArray;
    ingrFromGroup.push(new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'amount': new FormControl('', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
    }))
  }
  deleteIngredient(i: number) {
    this.ingredients.removeAt(i);
  }
  onSubmit() {
    let ingredients: Ingredient[] = [];
    let recipe: Recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['url'],
      ingredients
    );
    this.controls.forEach((formGroup: FormGroup) => {
      ingredients.push(new Ingredient(formGroup.value['name'], +formGroup.value['amount']))
    });
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.clear();
    if (this.editMode) {
      this.router.navigate(['..'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../', this.recipeService.getIndex(recipe)], { relativeTo: this.route });
    }
  }
  clear() {
    this.editMode = false;
    this.recipeForm.reset();
  }
  onCancel() {
    this.clear();
    this.router.navigate(['..'], { relativeTo: this.route });
  }
  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
