import { Injectable, OnInit } from '@angular/core';
import * as defaultPreset from "./preset.json";
import data from "./codeExampleData.json"; // Sanitize with https://tomeko.net/online_tools/cpp_text_escape.php?lang=en

export interface ListProperty {
  isFailing : boolean;
  currentLetter : number;
  listLetter : string[];
  listPossibleLetter : string[];
  length:number;
  isStrict:boolean;
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

  constructor() {
    this.loadDefaultPreset("only LowerCase");
  }

  listProperty:ListProperty = {
    isFailing : false,
    currentLetter: 0,
    listLetter: [],
    listPossibleLetter: [],
    length: 60,
    isStrict:false
  }

  tempJson = defaultPreset as unknown;
  presetJson = this.tempJson as { defaultPreset:[PresetList]};
  generateList = () => {
    //reset of UI
    this.listProperty.isFailing = false;
    this.listProperty.currentLetter = 0;
    this.listProperty.listLetter = [];


    // space iterator to add space with random interval
    let spaceIterator = 0;
    let enterIterator = 0;

    for(let i=0; i < this.listProperty.length ; i++) {
      // randomise letter in the array of possible letter
      this.listProperty.listLetter[i]= this.listProperty.listPossibleLetter[Math.floor(Math.random()*this.listProperty.listPossibleLetter.length)];
      spaceIterator++;
      enterIterator++;
      // logic for adding space and having an hard cap every 7 letter
      if(i+2 < this.listProperty.length) {
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


      // logic for adding break line and having an hard cap every 25 letter
      if(i+4 < this.listProperty.length && i > 8) {
        if(enterIterator === 25) {
          this.listProperty.listLetter[i+1]= 'Enter';
          enterIterator=0;
          i++;
        } else {
          let randomEnter = Math.random()*25;
          if( randomEnter < 1 && enterIterator > 5) {
            this.listProperty.listLetter[i+1]= 'Enter';
            enterIterator=0;
            i++;
          }
        }
      }

    }
  }

  generateCode = () => {
    //reset of UI
    this.listProperty.isFailing = false;
    this.listProperty.currentLetter = 0;
    this.listProperty.listLetter = [];

    this.listProperty.listLetter = data.code[Math.floor(Math.random()*data.code.length)].split("");
    this.listProperty.listLetter.forEach( (item,i) => {
      if(item === "\n") this.listProperty.listLetter[i] = "Enter";
      else if(item === "\t") this.listProperty.listLetter[i] = "Tab";
    })
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


