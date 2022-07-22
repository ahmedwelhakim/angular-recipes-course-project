import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from './../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],

})
export class RecipesComponent implements OnInit {
  constructor(private recipeServ: RecipeService, private router: Router, private dataStorageServ: DataStorageService) { }
  ngOnInit(): void {
    // this.dataStorageServ.fetchData().pipe(take(1)).subscribe(recipes => {
    //   if (recipes.length > 0) {
    //     this.router.navigate(['/recipes', 0]);
    //   }
    // })

  }


}
