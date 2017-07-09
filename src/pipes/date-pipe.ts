import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'datePipe',
pure: false})
export class DatePipe implements PipeTransform {
  transform(items: any) {

    if (items==undefined) return;
  return  items.sort(function(a: any, b: any) {

    // console.log(a.cikis+'cikis');
    // console.log(b.cikis+'cikis1');
      let nameA = (new Date(a.cikis)).getTime();
      let nameB = (new Date(b.cikis)).getTime();
      // console.log(nameA+'name');
      // console.log(nameB+'name');

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }
}
