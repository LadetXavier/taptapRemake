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
    this.listManagerPublic = this.listManager;
  }
  tempJson = keyJson as unknown;
  keyObj = this.tempJson as { keys:[any]};

  currentView: keyboardView = keyboardView.normal;
  readonly keyboardView = keyboardView;
  listManagerPublic: ListManagerService =this.listManager;
  listLength: number = 30;
  defaultPreset: any = "";

  seeList = () => {
    this.listManager.seeList();
  }

  setCurrentView = (value:keyboardView) => {
    this.currentView = value;
  }

  see = () => {
    console.log(this.defaultPreset);
  }

  lengthUpdate = () => {
    this.listManager.listProperty.length = this.listLength;
  }

  setIsStrict = (event:Event) => {
    if(event.target instanceof HTMLInputElement) {
        this.listManager.listProperty.isStrict = (event.target as HTMLInputElement).checked;
    }
  }

}
