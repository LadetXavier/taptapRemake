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

  isStarted:boolean = false;
  isEnded: boolean = false;
  timer: number = 0.0;
  intervalToClear:any = null;

  ngOnInit(): void {
    this.listManagerProperty = this.listManager.listProperty;
  }

  onStart = ($event:MouseEvent) => {
    ($event.target as HTMLButtonElement).blur();
    this.startGame();
  }

  onStopTimer = () => {
    clearInterval(this.intervalToClear);
  }

  startGame = () => {
    this.listManager.generateList();
    this.isStarted = true;
    this.isEnded = false;
    this.timer = 0;
    this.onStopTimer();
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
    if(this.listManagerProperty.isStrict) {

    }
    if(this.listManagerProperty.listLetter[this.listManagerProperty.currentLetter]===letterToTest
      && ((this.listManagerProperty.isStrict && !this.listManagerProperty.isFailing) || !this.listManagerProperty.isStrict)) {
       if(this.listManagerProperty.currentLetter === this.listManagerProperty.listLetter.length-1)  {
        this.isEnded = true;
        this.isStarted = false;
        this.onStopTimer();
      }
      else {
        this.listManager.nextLetter();
      }
      this.listManagerProperty.isFailing = false;


      return true;
    }
    else {
      if(this.listManagerProperty.isFailing && letterToTest === "Backspace") {
          this.listManagerProperty.isFailing=false;
      }
      else {
        this.listManagerProperty.isFailing = true;
      }
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
