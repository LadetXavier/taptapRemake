import { Injectable } from '@angular/core';
import * as defaultPreset from "./preset.json";

export interface ListProperty {
  isFailing : boolean;
  currentLetter : number;
  listLetter : string[];
  listPossibleLetter : string[];
}

export interface PresetList {
  name: string,
  list: string[]
}

@Injectable({
  providedIn: 'root'
})

// Service to generate and manage a list of random character
export class ListManagerService {

  constructor() { }

  listProperty:ListProperty = {
    isFailing : false,
    currentLetter: 0,
    listLetter: [],
    listPossibleLetter: []
  }

  tempJson = defaultPreset as unknown;
  presetJson = this.tempJson as { defaultPreset:[PresetList]};

  generateList = (length:number) => {
    //reset of UI
    this.listProperty.isFailing = false;
    this.listProperty.currentLetter = 0;
    this.listProperty.listLetter = [];


    // space iterator to add space with random interval
    let spaceIterator = 0;

    for(let i=0; i < length ; i++) {
      // randomise letter in the array of possible letter
      this.listProperty.listLetter[i]= this.listProperty.listPossibleLetter[Math.floor(Math.random()*this.listProperty.listPossibleLetter.length)];
      spaceIterator++;
      // logic for adding space and having an hard cap every 7 letter
      if(i+2 < length) {
        if(spaceIterator === 7) {
          this.listProperty.listLetter[i+1]= ' ';
          spaceIterator=0;
          i++;
        } else {
          let randomSpace = Math.random()*7;
          if( randomSpace < 1 && spaceIterator>2) {
            this.listProperty.listLetter[i+1]= ' ';
            spaceIterator=0;
            i++;
          }
        }
      }

    }
  }

  seeList = () => {
    console.log(this.listProperty.listPossibleLetter);
  }

  addLetter = (letter:string):void => {
    this.listProperty.listPossibleLetter.push(letter);
  }
   removeLetter = (letter:string):void => {
    let index = this.listProperty.listPossibleLetter.indexOf(letter);
    this.listProperty.listPossibleLetter.splice(index,1);
  }

   nextLetter= () => {
    this.listProperty.currentLetter+=1;
  }

  loadDefaultPreset = (namePreset:string) => {
    let tempListPossibleLetter = this.presetJson.defaultPreset.find( e => {
      return namePreset === e.name;
    })?.list;
    if (tempListPossibleLetter === undefined) {
      tempListPossibleLetter = [];
    }
    this.listProperty.listPossibleLetter = tempListPossibleLetter;
  }




}


