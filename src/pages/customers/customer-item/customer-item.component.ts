import { Component, Input } from '@angular/core';
import { CustomerModel } from 'src/models/customer/customer.model';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.css']
})
export class CustomerItemComponent {
  @Input()customer!: CustomerModel;

  

}
