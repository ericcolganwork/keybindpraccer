import { Component, OnInit, ViewChild } from '@angular/core';
import { KeybindModel } from './keybind-model';
import { KeyModel } from './key-model';
import { HostListener } from '@angular/core';
import { Guid } from '../services/guid';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';

@Component({
  selector: 'app-keybind',
  templateUrl: './keybind.component.html',
  styleUrls: ['./keybind.component.css']
})



export class KeybindComponent implements OnInit {

  @ViewChild('newBindForm', { static: false }) newBindForm: NgForm;

  constructor(public dialog: MatDialog) {

  }

  public ready: boolean;
  public showOptions: boolean;
  public keyBindModel: KeybindModel;
  public selectedKey: KeyModel;
  public keyboardActive: boolean;
  public guid: Guid;

  public newBind: KeyModel;


  ngOnInit() {
    this.keyBindModel = new KeybindModel();
    this.keyBindModel.keyList = JSON.parse(localStorage.getItem('keyList') || '[]');

    if (this.keyBindModel.keyList.length === 0) {
      this.keyBindModel.keyList = [
        new KeyModel('q', 'q', false, false, false),
        new KeyModel('w', 'w', false, false, false),
        new KeyModel('e', 'e', false, false, false),
        new KeyModel('r', 'r', false, false, false),
        new KeyModel('a', 'a', false, false, false),
        new KeyModel('s', 's', false, false, false),
        new KeyModel('d', 'd', false, false, false),
        new KeyModel('f', 'f', false, false, false),
        new KeyModel('s', 's', false, false, false),
        new KeyModel('1', '1', false, false, false),
        new KeyModel('2', '2', false, false, false),
        new KeyModel('3', '3', false, false, false),
        new KeyModel('4', '4', false, false, false),
      ];
    }


    this.showOptions = false;
    this.newBind = new KeyModel('', '', false, false, false);
    this.guid = new Guid();
    this.keyboardActive = true;
    this.selectedKey = this.keyBindModel.keyList[0];
  }



  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key);
    if (this.keyboardActive === true && !this.showOptions) {
      this.keyboardActive = false;
      if (event.key.toLowerCase() === this.selectedKey.Key.toLowerCase() && event.shiftKey === this.selectedKey.Shift
        && event.altKey === this.selectedKey.Alt && event.ctrlKey === this.selectedKey.Ctrl) {
        this.selectedKey.Class = 'green';
      } else {
        this.selectedKey.Class = 'red';
      }
      setTimeout(() => {
        this.nextKey();
        this.keyboardActive = true;
      }, 250);
    }
  }

  nextKey() {
    // Random Select
    this.selectedKey.Class = 'none';

    // Avoid same entry twice
    const nextList = this.keyBindModel.keyList.filter((bind) => bind.Key !== this.selectedKey.Key);
    const rand = Math.floor(Math.random() * nextList.length);

    this.selectedKey = nextList[rand];

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AboutDialogComponent, {
    });
  }

  save() {
    if (this.newBind.Key && this.newBind.Alias) {
      const newKM = new KeyModel(this.newBind.Key, this.newBind.Alias, this.newBind.Shift, this.newBind.Alt, this.newBind.Ctrl);
      this.keyBindModel.keyList.push(newKM);
      this.newBind.Key = '';
      this.newBind.Alias = '';
      this.newBind.Shift = false;
      this.newBind.Alt = false;
      this.newBind.Ctrl = false;

      localStorage.setItem('keyList', JSON.stringify(this.keyBindModel.keyList));
    }
  }

  copy(km: KeyModel) {
    const newKM = new KeyModel(km.Key, km.Alias, km.Shift, km.Alt, km.Ctrl);
    this.keyBindModel.keyList.push(newKM);
  }

  delete(km: KeyModel) {
    this.keyBindModel.keyList = this.keyBindModel.keyList.filter((bind) => bind.Id !== km.Id);
    localStorage.setItem('keyList', JSON.stringify(this.keyBindModel.keyList));
  }

  options() {
    this.showOptions = !this.showOptions;
  }
}



