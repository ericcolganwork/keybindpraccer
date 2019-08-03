import { Component, OnInit } from '@angular/core';
import { KeybindModel } from './keybind-model';
import { KeyModel } from './key-model';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-keybind',
  templateUrl: './keybind.component.html',
  styleUrls: ['./keybind.component.css']
})
export class KeybindComponent implements OnInit {

  constructor() { }

  public keyBindModel: KeybindModel;
  public selectedKey: KeyModel;
  public index: number;
  public keyboardActive: boolean;

  ngOnInit() {
    this.keyBindModel = new KeybindModel();
    this.keyBindModel.keyList = [
      new KeyModel('e'),
      new KeyModel('f'),
      new KeyModel('q'),
      new KeyModel('w'),
      new KeyModel('r'),
      new KeyModel('3')
    ];

    this.keyboardActive = true;
    this.index = 0;
    this.selectedKey = this.keyBindModel.keyList[this.index];
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.keyboardActive === true) {
      this.keyboardActive = false;
      if (event.key === this.selectedKey.Key) {
        this.selectedKey.Class = 'green';
      } else {
        this.selectedKey.Class = 'red';
      }
      setTimeout(() => {
        this.nextKey();
        this.keyboardActive = true;
      }, 500);
    }
  }

  nextKey() {
    // Random Select
    this.selectedKey.Class = 'none';
    let rand = Math.floor(Math.random() * this.keyBindModel.keyList.length);

    // Avoid same entry twice
    if ( rand === this.index && (rand === this.keyBindModel.keyList.length - 1 ||  rand === 0)) {
      rand =  this.keyBindModel.keyList.length - 2;
    }

    if ( rand === this.index ) {
      rand = rand + 1;
    }

    this.index = rand;
    this.selectedKey = this.keyBindModel.keyList[this.index];

    // Doing it by index
    // if (this.index >= this.keyBindModel.keyList.length - 1) {
    //   this.index = 0;
    // } else {
    //   this.index = this.index + 1;
    // }
    // this.selectedKey.Class = 'none';
    // this.selectedKey = this.keyBindModel.keyList[this.index];
  }

}
