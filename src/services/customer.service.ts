import { CustomerModel } from './../models/customer/customer.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customersEvent=new BehaviorSubject<CustomerModel[]|undefined|null>(null);
  customerSelectedEvent= new BehaviorSubject<CustomerModel|undefined|null>(null);
  private customerSelected?: CustomerModel | undefined | null;


  private customers: CustomerModel[] = [];

  constructor() {
    this.customers = new Array<CustomerModel>();
    this.customers.push(new CustomerModel("1",'Martin Lopez','Guatuso','222'));
    this.customers.push(new CustomerModel("2",'Ramiro Vargas','Quesada','333'));
    this.customers.push(new CustomerModel("3",'Randal Vasquez','Upal','444'));
    this.customers.push(new CustomerModel("4",'Juliana Vasquez','San Viven','434'));
    this.customers.push(new CustomerModel("5",'Milena Ferreto','Los Chiles','443'));
    this.customers.push(new CustomerModel("1",'Martin Lopez','Guatuso','222'));
    this.customers.push(new CustomerModel("2",'Ramiro Vargas','Quesada','333'));
    this.customers.push(new CustomerModel("3",'Randal Vasquez','Upal','444'));
    this.customers.push(new CustomerModel("4",'Juliana Vasquez','San Viven','434'));
    this.customers.push(new CustomerModel("5",'Milena Ferreto','Los Chiles','443'));
    this.customers.push(new CustomerModel("1",'Martin Lopez','Guatuso','222'));
    this.customers.push(new CustomerModel("2",'Ramiro Vargas','Quesada','333'));
    this.customers.push(new CustomerModel("3",'Randal Vasquez','Upal','444'));
    this.customers.push(new CustomerModel("4",'Juliana Vasquez','San Viven','434'));
    this.customers.push(new CustomerModel("5",'Milena Ferreto','Los Chiles','443'));
    this.customers.push(new CustomerModel("1",'Martin Lopez','Guatuso','222'));
    this.customers.push(new CustomerModel("2",'Ramiro Vargas','Quesada','333'));
    this.customers.push(new CustomerModel("3",'Randal Vasquez','Upal','444'));
    this.customers.push(new CustomerModel("4",'Juliana Vasquez','San Viven','434'));
    this.customers.push(new CustomerModel("5",'Milena Ferreto','Los Chiles','443'));
  }

  public getCustomerList(): CustomerModel[] {
    return this.customers;
  }

  public get getCustomerSelected(): CustomerModel | undefined | null {
    return this.customerSelected;
  }
  public set setCustomerSelected(value: CustomerModel|null) {
    this.customerSelected = value;
    //alert(this.customerSelected.identification);
    this.customerSelectedEvent.next(this.customerSelected);
  }

  public addNewCustomer(customerModel:CustomerModel):void{
      this.customers.push(customerModel);
      this.customersEvent.next(this.customers);
  }

  public getCustomer(identification:string):CustomerModel|undefined{
   return this.customers.find(customer => customer.identification==identification);
  }

  public updateCustomer(customerModel:CustomerModel):void{
    this.customers.map((customer) => {
      if(customerModel.identification==customer.identification){
        customer.name=customerModel.name;
        customer.address=customerModel.address;
        customer.phone=customerModel.phone;
      }
    });
    this.customersEvent.next(this.customers);
}

}
