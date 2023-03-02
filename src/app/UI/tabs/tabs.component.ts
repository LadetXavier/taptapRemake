import { Component, OnInit } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tabs: TabComponent[] = [];
  addTab = (tab:TabComponent) => {
    if(this.tabs.length===0) {
      tab.active=true;
    }
    this.tabs.push(tab);

  }

  selectTab = (tab:TabComponent) => {
    this.tabs.forEach( (current) => {
      current.active=false;
    } )
    tab.active=true;

  }
}
