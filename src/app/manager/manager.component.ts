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

  ngOnInit(): void {
    this.listManagerProperty = this.listManager.listProperty;
  }

  onKeyType = (event:KeyboardEvent) => {

    this.testCurrentLetter(event.key);
  }

  testCurrentLetter = (letterToTest:string) => {
    if(this.listManagerProperty.listLetter[this.listManagerProperty.currentLetter]===letterToTest) {
      this.nextLetter();
      this.listManagerProperty.isFailing = false;
      return true;
    }
    else {
      this.listManagerProperty.isFailing = true;
      return false;
    }
  }

  nextLetter= () => {
    this.listManagerProperty.currentLetter+=1;
  }

}
