import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  constructor() { }


  target:string[] = [];
  currentLetter:number = 0;

  onKeyType = (event:KeyboardEvent) => {

    this.testCurrentLetter(event.key);
  }

  testCurrentLetter = (letterToTest:string) => {
    if(this.target[this.currentLetter]===letterToTest) {
      this.nextLetter();
      return true;
    }
    else return false;
  }

  nextLetter= () => {
    this.currentLetter+=1;
    if(this.target[this.currentLetter]===' ') {
      this.currentLetter +=1;
    }
  }

  ngOnInit(): void {
    let tempString = "gdfgdg dgdfd gfdm qo iiie";
    this.target= tempString.split('');
  }

}
