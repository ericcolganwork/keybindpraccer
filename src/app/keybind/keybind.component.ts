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
    this.selectedKey = this.keyBindModel.keyList[0];
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

    // Avoid same entry twice
    const nextList = this.keyBindModel.keyList.filter((bind) => bind.Key !== this.selectedKey.Key);
    const rand = Math.floor(Math.random() * nextList.length);

    this.selectedKey = nextList[rand]
    ;

  }

}
