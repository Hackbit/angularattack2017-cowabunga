import { Pipe, PipeTransform } from '@angular/core';
import * as ColorHash from 'color-hash';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new ColorHash().hex(value);
  }

}
