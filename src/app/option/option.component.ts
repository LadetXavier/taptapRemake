import { Component, Input, OnInit } from '@angular/core';
import { ListManagerService } from '../list-manager.service';


@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  constructor( private listManager: ListManagerService ) { }

  ngOnInit(): void {
  }

  listLength: number = 30;

  StartNewTest = () => {
    this.listManager.generateList(this.listLength);
  }

}
