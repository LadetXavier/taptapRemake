import { Component, Input, OnInit, HostBinding, DoCheck } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {keyboardView} from '../option.component';
import { ListManagerService, ListProperty } from '../../list-manager.service';

interface KeyData {
    normalValue: string,
    majValue: null | string,
    altGr: null | string,
    gridRow: string,
    gridCol: string,
    specialClass : string[],
    specialStyle: string,
    isClickable: boolean
}

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {

  constructor(private sanitizer:DomSanitizer, private listManager:ListManagerService) { }

  @Input() keyData: KeyData = {
    normalValue: "Default",
    majValue: null ,
    altGr: null ,
    gridRow: "default",
    gridCol: "default",
    specialClass :  [],
    specialStyle: "",
    isClickable: false
  }

  @Input() currentView: keyboardView = keyboardView.normal;
  readonly keyboardView = keyboardView;

  @HostBinding("class") get classes() {
    return this.keyData.specialClass;
  }

  @HostBinding("style.gridRow") get row() {
    return this.sanitizer.bypassSecurityTrustStyle(this.keyData.gridRow );
  }
  @HostBinding("style.gridColumn") get col() {
    return this.sanitizer.bypassSecurityTrustStyle(this.keyData.gridCol );
  }

  listManagerProperty: ListProperty | any = {};

  normalValueAdded: boolean = false;
  upperValueAdded: boolean = false;
  altGrValueAdded: boolean = false;

  ngDoCheck() {
    if(this.listManagerProperty.listPossibleLetter !== undefined) {
      this.alreadyActive();
    }

  }

  onSelectKey = () => {
    if(this.keyData.isClickable) {
      if(this.currentView === keyboardView.normal){
        this.normalValueAdded = !this.normalValueAdded;
        if(this.normalValueAdded){
          this.listManager.addLetter(this.keyData.normalValue);
        }
        else {
          this.listManager.removeLetter(this.keyData.normalValue);
        }
      }
      if(this.currentView === keyboardView.uppercase && this.keyData.majValue){
        this.upperValueAdded = !this.upperValueAdded;
        if(this.upperValueAdded ){
          this.listManager.addLetter(this.keyData.majValue);
        }
        else {
          this.listManager.removeLetter(this.keyData.majValue);
        }
      }
      if(this.currentView === keyboardView.altGr && this.keyData.altGr){
        this.altGrValueAdded = !this.altGrValueAdded;
        if(this.altGrValueAdded ){
          this.listManager.addLetter(this.keyData.altGr);
        }
        else{
          this.listManager.removeLetter(this.keyData.altGr);
        }
      }
    }

  }

  alreadyActive = () => {
    if(this.listManagerProperty.listPossibleLetter.indexOf(this.keyData.normalValue) !== -1) {
      this.normalValueAdded=true;
    }
    else {
      this.normalValueAdded=false;
    }
     if(this.listManagerProperty.listPossibleLetter.indexOf(this.keyData.majValue) !== -1) {
      this.upperValueAdded=true;
    } else {
      this.upperValueAdded=false;
    }
     if(this.listManagerProperty.listPossibleLetter.indexOf(this.keyData.altGr) !== -1) {
      this.altGrValueAdded=true;
    } else {
      this.altGrValueAdded=false;
    }
  }


  ngOnInit(): void {
    this.listManagerProperty=this.listManager.listProperty;
    this.alreadyActive();
  }

}
