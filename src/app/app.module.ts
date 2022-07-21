import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { RecipesModule } from './recipes/recipes-modules/recipes.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShoppingListModule } from './shopping-list/shopping-list.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShoppingListModule,
    RecipesModule,
    AuthModule,
    SharedModule,
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
