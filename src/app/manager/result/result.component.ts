import { Component, Input, OnInit } from '@angular/core';
import { ListManagerService, ListProperty } from '../../list-manager.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input() timer:number = 0;
  listManagerProperty: ListProperty | any = {};


  constructor(private listManager: ListManagerService) { }

  ngOnInit(): void {
    this.listManagerProperty = this.listManager.listProperty;
  }


}
