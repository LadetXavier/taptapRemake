import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


// Service to generate and manage a list of random character
export class ListManagerService {

  listProperty:ListProperty = {
    isFailing : false,
    currentLetter: 0,

    listLetter: [],
    listPossibleLetter: ['a','z','e','r','t','y','u','i','o','p',
  'q','s','d','f','g','h','j','k','l','m',
  'w','x','c','v','b','n',',',';',':','!',
  '&','é',"\"",'\'','(','-','è','_','ç','à',')','=']

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

  constructor() { }
}

export interface ListProperty {
  isFailing : boolean;
  currentLetter : number;

  listLetter : string[];
  listPossibleLetter : string[];

}
