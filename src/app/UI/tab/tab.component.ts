import { Component, Input, OnInit } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  constructor(private tabs:TabsComponent) {
    tabs.addTab(this);
  }

  ngOnInit(): void {
  }

  @Input() tabTitle:string ='Tab';
  active:boolean=false;

}
