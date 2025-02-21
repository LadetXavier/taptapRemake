import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ListManagerService, ListProperty } from '../../list-manager.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit,AfterViewInit {

  @Input() timer:number = 0;
  @Input() restart:Function = () => {};
  @Input() fails:number = 0;
  listManagerProperty: ListProperty | any = {};
  @ViewChildren("restartRef") viewRestart!: QueryList<ElementRef>;


  constructor(private listManager: ListManagerService) { }

  ngOnInit(): void {
    this.listManagerProperty = this.listManager.listProperty;

  }

  ngAfterViewInit(): void {
    this.viewRestart.first.nativeElement.focus();
    console.log('focused');
  }

  onRestart = () => {
    this.restart();
  }


}
