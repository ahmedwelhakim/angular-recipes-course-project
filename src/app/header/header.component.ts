import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() itemSelected = new EventEmitter<string>();
  constructor(private dataStorageService:DataStorageService) { }

  ngOnInit(): void {
  }
  onItemSelected(item:string){
    this.itemSelected.emit(item);
  }
  onSaveData(){
    this.dataStorageService.storeData();
  }
  onFetchData(){
    this.dataStorageService.fetchData().subscribe();
  }
}
