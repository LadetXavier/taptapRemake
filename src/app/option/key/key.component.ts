import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

interface KeyData {
    normalValue: string,
    majValue: null | string,
    altGr: null | string,
    gridRow: string,
    gridCol: string,
    specialClass : string[],
    specialStyle: string,
}

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {

  constructor(private sanitizer:DomSanitizer) { }

  @Input() keyData: KeyData = {
    normalValue: "Default",
    majValue: null ,
    altGr: null ,
    gridRow: "default",
    gridCol: "default",
    specialClass :  [],
    specialStyle: ""
  }

  @HostBinding("class") get classes() {
    return this.keyData.specialClass;
  }

  @HostBinding("style.gridRow") get row() {
    return this.sanitizer.bypassSecurityTrustStyle(this.keyData.gridRow );
  }
  @HostBinding("style.gridColumn") get col() {
    return this.sanitizer.bypassSecurityTrustStyle(this.keyData.gridCol );
  }


  ngOnInit(): void {
  }

}
