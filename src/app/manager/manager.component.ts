import { Component, Input, OnInit } from '@angular/core';

import { Target } from "../services/target.services";


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  constructor( private target: Target) {

  }


  targetList:string[] = [];
  currentLetter:number = 0;

  onKeyType = (event:KeyboardEvent) => {

    this.testCurrentLetter(event.key);
  }

  testCurrentLetter = (letterToTest:string) => {
    if(this.targetList[this.currentLetter]===letterToTest) {
      this.nextLetter();
      return true;
    }
    else return false;
  }

  nextLetter= () => {
    this.currentLetter+=1;
  }

  ngOnInit(): void {
    let tempString = "gDfgdg dgdfd gfdm qo iiie";
    this.targetList= tempString.split('');
    this.target.generateList(90);
    this.targetList = this.target.listLetter;
  }

}
