import { Injectable } from '@angular/core';

export interface ListProperty {
  isFailing : boolean;
  currentLetter : number;
  listLetter : string[];
  listPossibleLetter : string[];
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

  generateList = (length:number) => {
    //reset of UI
    this.listProperty.isFailing = false;
    this.listProperty.currentLetter = 0;


    // space iterator to add space with random interval
    let spaceIterator = 0;

    for(let i=0; i < length ; i++) {
      // randomise letter in the array of possible letter
      this.listProperty.listLetter[i]= this.listProperty.listPossibleLetter[Math.floor(Math.random()*this.listProperty.listPossibleLetter.length)];
      spaceIterator++;
      // logic for adding space and having an hard cap every 7 letter
      if(spaceIterator === 7 && i+1 < length) {
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




}


