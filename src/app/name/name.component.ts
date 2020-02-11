import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {

  @Output() nameEntered = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  submitName(name) {
    this.nameEntered.emit(name);
  }

}
