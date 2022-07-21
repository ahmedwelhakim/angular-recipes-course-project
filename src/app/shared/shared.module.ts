import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

@NgModule({
  declarations:[
    DropdownDirective,
  ],
  imports:[
    CommonModule,
  ],
  exports:[
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule{

}
