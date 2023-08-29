import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filtering:string, propName:string): any {

    if(value.length==0 || filtering==''){
      return value;
    }
    else{
      const resultArray:any=[];
      value.forEach((item: { [x: string]: string; })=>{
            if(item[propName]!=undefined&&item[propName].toLowerCase().includes(filtering.toLowerCase())){
              resultArray.push(item);
            }
        })
      return resultArray;
    }
  }

}
