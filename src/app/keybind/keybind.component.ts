import { Component, OnInit } from '@angular/core';
import { KeybindModel } from './keybind-model';
import { Key } from 'readline';
import { KeyModel } from './key-model';

@Component({
  selector: 'app-keybind',
  templateUrl: './keybind.component.html',
  styleUrls: ['./keybind.component.css']
})
export class KeybindComponent implements OnInit {

  constructor() { }

  public keyBindModel: KeybindModel;

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
  }

}
