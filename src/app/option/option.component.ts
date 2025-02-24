import { Component, Input, OnInit } from '@angular/core';
import { ListManagerService } from '../list-manager.service';
import  * as keyJson from "./keymapping.json";
import { Preset } from "../list-manager.service"

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
    this.updateListPresetAvailable();
  }
  tempJson = keyJson as unknown;
  keyObj = this.tempJson as { keys:[any]};

  currentView: keyboardView = keyboardView.normal;
  readonly keyboardView = keyboardView;
  listManagerPublic: ListManagerService =this.listManager;
  listLength: number = 30;
  loadPresetName: string = '';
  savePresetName: string ='';
  listPresetAvailable: string[] = [];



  seeList = () => {
    this.listManager.seeList();
    localStorage
  }

  updateListPresetAvailable = () => {
    this.listPresetAvailable = [];
    for(let i=0;i < localStorage.length;i++){
      this.listPresetAvailable.push(localStorage.key(i)!)
    }
  }

  setCurrentView = (value:keyboardView) => {
    this.currentView = value;
  }

  lengthUpdate = () => {
    this.listManager.listProperty.length = this.listLength;
  }

  setIsStrict = (event:Event) => {
    if(event.target instanceof HTMLInputElement) {
        this.listManager.listProperty.isStrict = (event.target as HTMLInputElement).checked;
    }
  }

  savePreset = (name:string) => {
    this.listManagerPublic.savePreset(name);
    this.savePresetName = '';
    this.updateListPresetAvailable();
  }

  loadPreset = (name:string) => {
    if(name === ''){
      name = this.listManagerPublic.nameDefaultPreset;
    }
    this.listManagerPublic.loadPreset(name);
  }

}
