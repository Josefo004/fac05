import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styles: [
  ]
})
export class InputComponent implements OnInit {

  @Output() onEnter :EventEmitter<string> = new EventEmitter();
  @Output() onDebounce:EventEmitter<string> = new EventEmitter(); 

  @Input() placeholder:string='';
  @Input() terminoIn!:string;
  @Input() showicono:boolean=true;

  debouncer: Subject<string> = new Subject();

  //termino:string=this.terminoIn;

  constructor() { }

  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(370))
      .subscribe(valor => {
        //console.log('debouncer', valor);
        this.onDebounce.emit( valor );
      });
  }

  buscar(){
    if(this.terminoIn.length>0) {this.onEnter.emit( this.terminoIn.toUpperCase() )};
  }

  teclaPrecionada(){
    if (this.terminoIn.length>0) {this.debouncer.next( this.terminoIn.toUpperCase() )};
  }
}
