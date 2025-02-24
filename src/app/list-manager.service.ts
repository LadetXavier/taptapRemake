import { Injectable, OnInit } from '@angular/core';
import * as defaultPreset from "./preset.json";
import data from "./codeExampleData.json"; // Sanitize with https://tomeko.net/online_tools/cpp_text_escape.php?lang=en

export interface ListProperty {
  isFailing : boolean;
  currentLetter : number;
  listLetter : string[];
  listPossibleLetter : string[];
  tempList: string[];
  length:number;
  isStrict:boolean;
}

export interface Preset {
  name: string,
  list: string[]
}

@Injectable({
  providedIn: 'root'
})

// Service to generate and manage a list of random character
export class ListManagerService {

  constructor() {
    this.loadDefaultPreset(this.nameDefaultPreset);
  }

  listProperty:ListProperty = {
    isFailing : false,
    currentLetter: 0,
    listLetter: [],
    listPossibleLetter: [],
    length: 60,
    tempList: [],
    isStrict:false
  }

  tempJson = defaultPreset as unknown;
  presetJson = this.tempJson as { defaultPreset:[Preset]};
  nameDefaultPreset : string = "Only LowerCase";



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

  }

  addLetter = (letter:string):void => {
    this.listProperty.tempList.push(letter);


  }
   removeLetter = (letter:string):void => {
    let index = this.listProperty.tempList.indexOf(letter);
    this.listProperty.tempList.splice(index,1);
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
    this.listProperty.tempList = [...tempListPossibleLetter];

    for(let i=0; i < this.presetJson.defaultPreset.length;i++){
      if(localStorage.getItem(this.presetJson.defaultPreset[i].name) === null){
        localStorage.setItem(this.presetJson.defaultPreset[i].name,JSON.stringify(this.presetJson.defaultPreset[i].list));
      }
    }
  }

  loadPreset = (name:string) => {
    let tempListPossibleLetter = JSON.parse(localStorage.getItem(name)!);
    this.listProperty.listPossibleLetter = tempListPossibleLetter;
    this.listProperty.tempList = [...tempListPossibleLetter];
  }

  savePreset = (presetToSave:string) => {
    if(presetToSave !== '') {
       localStorage.setItem(presetToSave,JSON.stringify(this.listProperty.tempList));
    }
  }

  lookLocalStorage = () => {
    console.log("local storage");
    for (let i = 0; i < localStorage.length; i++)   {
      if(localStorage.key(i)!== null) {
        console.log(localStorage.key(i));
        console.log(JSON.parse(localStorage.getItem(localStorage.key(i)!)!));
      }
    }
  }

  saveChange = () => {
    this.listProperty.listPossibleLetter = [...this.listProperty.tempList];
  }




}


