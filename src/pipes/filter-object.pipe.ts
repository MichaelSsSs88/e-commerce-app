import { Pipe, PipeTransform } from '@angular/core';
import { BillModel } from 'src/models/bill/bill.model';
import { CustomerModel } from 'src/models/customer/customer.model';

@Pipe({
  name: 'filter_object'
})
export class FilterObject implements PipeTransform {

  transform(value: any, filtering:string, propName:string): any {

    if(value.length==0 || filtering==''){
      return value;
    }
    else{
      const resultArray:any=[];
      value.forEach((item:any)=>{
            if(item.customer.name.toLowerCase().includes(filtering.toLowerCase())){
              resultArray.push(item);
            }
        })
      return resultArray;
    }
  }

}
