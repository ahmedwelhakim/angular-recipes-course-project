import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as AuthActions from './../auth/store/auth.actions';
import { DataStorageService } from './../shared/data-storage.service';
import * as fromApp from './../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() itemSelected = new EventEmitter<string>();
  subscription: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>,

  ) { }
  loggedIn = false;
  ngOnInit(): void {

    this.subscription = this.store.select('auth').pipe(map(userState => userState.user)).subscribe((user) => {
      this.loggedIn = user !== null;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeData();
  }
  onFetchData() {

    this.dataStorageService.fetchData().subscribe();

  }
  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
