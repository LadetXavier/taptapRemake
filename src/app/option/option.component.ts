import { Component, Input, OnInit } from '@angular/core';
import { ListManagerService } from '../list-manager.service';
import  * as keyJson from "./keymapping.json";

export enum keyboardView {
  normal,
  uppercase,
  altGr
}

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  constructor( private listManager: ListManagerService ) { }


  ngOnInit(): void {


  }
  tempJson = keyJson as unknown;
  keyObj = this.tempJson as { keys:[any]};

  currentView: keyboardView = keyboardView.normal;
  readonly keyboardView = keyboardView;

  seeList = () => {
    this.listManager.seeList();
  }

  setCurrentView = (value:keyboardView) => {
    this.currentView = value;
  }

}
