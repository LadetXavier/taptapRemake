import { Component, Input, OnInit } from '@angular/core';
import { ListManagerService, ListProperty } from '../list-manager.service';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  constructor( private listManager: ListManagerService) {
  }

  listManagerProperty: ListProperty | any = {};
  isOptionDisplayed: boolean = false;
  listLength: number = 30;
  isStarted:boolean = false;
  isEnded: boolean = false;
  timer: number = 0.0;
  intervalToClear:any = null;

  ngOnInit(): void {
    this.listManagerProperty = this.listManager.listProperty;
  }

  onOption = () => {
    this.isOptionDisplayed=!this.isOptionDisplayed;
  }

  onStart = ($event:MouseEvent) => {
    ($event.target as HTMLButtonElement).blur();
    this.listManager.generateList(this.listLength);
    this.isStarted = true;
    this.timer = 0;
    this.onStopTimer();
  }

  onStopTimer = () => {
    clearInterval(this.intervalToClear);
  }

  // Game related method

  onKeyType = (event:KeyboardEvent) => {
    if(this.isStarted) {
      this.testCurrentLetter(event.key);
    }
  }

  testCurrentLetter = (letterToTest:string) => {
    if(this.listManagerProperty.currentLetter === 0 && this.timer===0)  {
      this.startTimer();
    }
    if(this.listManagerProperty.listLetter[this.listManagerProperty.currentLetter]===letterToTest) {
       if(this.listManagerProperty.currentLetter === this.listManagerProperty.listLetter.length-1)  {
        this.isEnded = true;
        this.onStopTimer();
      }
      else {
        this.listManager.nextLetter();
      }
      this.listManagerProperty.isFailing = false;


      return true;
    }
    else {
      this.listManagerProperty.isFailing = true;
      return false;
    }
  }



  startTimer= () => {
    this.intervalToClear = setInterval(this.interval,100);
  }

  interval = () => {
    this.timer = this.timer + 0.1;
  }

}
