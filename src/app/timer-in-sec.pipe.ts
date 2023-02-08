import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerInSec'
})
export class TimerInSecPipe implements PipeTransform {

  transform(value: number,decimal:number): string {
    return parseFloat(value.toString()).toFixed(decimal) ;
  }

}
