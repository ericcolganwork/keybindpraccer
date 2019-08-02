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

    this.index = 0;
    this.selectedKey = this.keyBindModel.keyList[this.index];
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === this.selectedKey.Key) {
      this.selectedKey.Class = 'green';
    } else {
      this.selectedKey.Class = 'red';
    }
    this.nextkey();
  }

  nextkey() {
    if (this.index >= this.keyBindModel.keyList.length) {
      this.index = 0;
    } else {
      this.index = this.index + 1;
    }
    this.selectedKey = this.keyBindModel.keyList[this.index];
  }

}
