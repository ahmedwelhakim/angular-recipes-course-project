import { AuthGuardGuard } from './auth/auth-guard.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { RecipesResolver } from './recipes/recipes.resolver';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthComponent } from './auth/auth.component';



const routes: Routes = [
  {path:'',redirectTo:'/recipes',pathMatch:"full"},
  {path:'auth',component:AuthComponent,children:[
    {path:'',redirectTo:'login',pathMatch:"full"},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
  ]},
  {path:'shopping-list',component:ShoppingListComponent}

]
@NgModule({
  imports:[
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule]
})
export class AppRoutingModule{

}
