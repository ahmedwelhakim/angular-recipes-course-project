import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { ItemNotFoundComponent } from './recipes/item-not-found/item-not-found.component';
import { RecipesModule } from './recipes/recipes-modules/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import * as fromApp from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShoppingListModule,
    RecipesModule,
    AuthModule,
    SharedModule,
    StoreModule.forRoot(fromApp.appReducer),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
