import { Component, Input, OnInit } from '@angular/core';
import { ListManagerService } from '../list-manager.service';
import  * as keyJson from "./keymapping.json";


@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  constructor( private listManager: ListManagerService ) { }

  ngOnInit(): void {
    console.log(this.keyObj.keys);

  }
  tempJson = keyJson as unknown;
  keyObj = this.tempJson as { keys:[any]};
  listLength: number = 30;

  StartNewTest = () => {
    this.listManager.generateList(this.listLength);
  }

}
