import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {

  constructor() { }

  name: string = "boy";

  onName = () => {
    this.name = (<HTMLInputElement>document.getElementById("name"))?.value ?? '';
    console.log(document.getElementById("name"));
  }

  ngOnInit(): void {
  }

}
