import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'milliseconds'
})
export class MillisecondsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(value).format('DD MMM YYYY, hh:mm a');
  }

}
