import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements AfterViewInit{

  @HostListener('click') toggle(event:Event){
    if(this.menuDropDownEl.classList.contains('show'))
      this.render.removeClass(this.menuDropDownEl,'show');
    else
      this.render.addClass(this.menuDropDownEl,'show');
  }
  menuDropDownEl:HTMLElement
  constructor(private elementRef:ElementRef,private render:Renderer2) { }
  ngAfterViewInit(){
    const children = (<HTMLElement>this.elementRef.nativeElement).children;
    console.log(children);
    for (let i = 0; i < children.length; i++) {
      if((<HTMLElement>children[i]).classList.contains('dropdown-menu') != null){
        this.menuDropDownEl = <HTMLElement>children[i];
      }
    }
  }

}
