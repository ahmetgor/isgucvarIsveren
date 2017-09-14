import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'datePipe',
pure: false})
export class DatePipe implements PipeTransform {
  transform(items: any, arg:any) {
    console.log("datepipe"+arg);

    if (arg != undefined && arg == 'seviye') {
      switch(items) {
          case 1:
              return 'Başlangıç';
          case 2:
          return 'Orta';
          case 3:
              return 'İyi';
          case 4:
          return 'Çok İyi';
          case 5:
          return 'Mükemmel';
      }
    }

    else if (arg != undefined && arg == 'egitimdurum') {
      switch(items) {
          case 1:
              return 'İlköğretim';
          case 2:
          return 'Lise';
          case 3:
              return 'Lisans';
          case 4:
          return 'Yüksek Lisans';
          case 5:
          return 'Doktora';
      }
    }

    else {
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
}
