import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() itemSelected = new EventEmitter<string>();
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }
  loggedIn = false;
  ngOnInit(): void {

    this.authService.user.subscribe((user) => {
      this.loggedIn = user !== null;
    });
  }

  onSaveData() {
    this.dataStorageService.storeData();
  }
  onFetchData() {

    this.dataStorageService.fetchData().subscribe();

  }
  logout() {
    this.authService.logout();
  }
}
