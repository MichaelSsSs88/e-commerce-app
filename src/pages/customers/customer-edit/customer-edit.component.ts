import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { CustomerModel } from 'src/models/customer/customer.model';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnDestroy {
  class_quantity: string = "peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  isFormReady: boolean = false;
  buttonMessage:string="Save";
  class_identification: string = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600" ;
  class_ingredient: string = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600" ;
  class_name: string = "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  class_description: string = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600";
  class_description_input="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-2";
  customerSelectedSubscription:Subscription= new Subscription();
  customerSeleted?:CustomerModel | undefined | null;
  recipeForm: FormGroup;

  constructor(private router:Router, private customerService:CustomerService){
    this.customerSelectedSubscription= this.customerService.customerSelectedEvent.subscribe((customerSelected:CustomerModel|undefined|null)=>{
          this.router.url.match("edit")&&(this.customerSeleted= customerSelected, this.buttonMessage="Update");
          !this.router.url.match("edit")&&(this.buttonMessage="Save");
    });
    this.recipeForm= new FormGroup({
      identification: new FormControl(this.customerSeleted?this.customerSeleted.identification:"", [Validators.required,this.validateIdentification ]),
      name: new FormControl(this.customerSeleted?this.customerSeleted.name:"", [Validators.required, this.validateName]),
      address: new FormControl(this.customerSeleted?this.customerSeleted.address:"", [Validators.required/*, this.validateName*/]),
      phone: new FormControl(this.customerSeleted?this.customerSeleted.phone:"",[Validators.required/*,this.validateDescription*/]),
    });


  }
  ngOnDestroy(): void {
    this.customerSelectedSubscription.unsubscribe();
    //throw new Error('Method not implemented.');
  }

  validateIdentification(control: AbstractControl): any[] {
    const value=control.value;
    let errors:any[]=new Array();
    console.log( /^-?\d+$/.test(value));

    if(value!==null && !/^-?\d+$/.test(value)){
      errors.push('Please a valid identification');
    }
    return errors;
  }

  validateName(control: AbstractControl): any[] {
    const value=control.value;
    let errors:any[]=new Array();
    if(value!==null && value.trim().length<3){
      errors.push('Please enter a valid name. At least 3 characters');
    }
    return errors;
  }

  showError(controlName:string):any[]{
    let error:any[]=new Array<string>();
    const value= this.recipeForm.get(controlName);
    if(value!=null&&!value.valid &&value.touched){
      value.errors&&Object.values(value.errors).forEach(err=>{
        err!=true&&error.push(err);
        console.log(err);
      });

      if (controlName == "name") {
        this.class_name = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-red-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600 peer-focus:border-red-600";
        this.class_name="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-600 appearance-none dark:text-white dark:border-red-600 dark:focus:border-red-600 focus:outline-none focus:ring-0 focus:border-red-600 peer";
        return error;
      }


      if (controlName == "identification") {
        this.class_identification = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-red-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600 peer-focus:border-red-600";
        //this.class_identification="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-600 appearance-none dark:text-white dark:border-red-600 dark:focus:border-red-600 focus:outline-none focus:ring-0 focus:border-red-600 peer";
        return error;
      }
    }

    controlName=="name"&&(this.class_name = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
                          this.class_name= "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer");

    return error;
  }

  onSubmit():void{
    //alert(this.recipeForm.value.identification);
   this.buttonMessage=="Save"?this.customerService.addNewCustomer(new CustomerModel(this.recipeForm.value.identification, this.recipeForm.value.name, this.recipeForm.value.address,this.recipeForm.value.phone)):"";
   this.buttonMessage=="Update"?this.customerService.updateCustomer(new CustomerModel(this.recipeForm.value.identification, this.recipeForm.value.name, this.recipeForm.value.address,this.recipeForm.value.phone)):"";
   this.router.navigate(['saved']);

  }

}
