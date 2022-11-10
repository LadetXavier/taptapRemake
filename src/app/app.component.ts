import { Component } from '@angular/core';

import { Target } from "./services/target.services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'taptapRemake';
  constructor ( private target:Target) {

  }


}


