import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BillLineModel } from 'src/models/bill-line/bill-line.model';
import { BillModel } from 'src/models/bill/bill.model';
import { CustomerModel } from 'src/models/customer/customer.model';
import { BillService } from 'src/services/bill.service';
import { CalculateService } from 'src/services/calculate.service';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-bill-item',
  templateUrl: './bill-item.component.html',
  styleUrls: ['./bill-item.component.css']
})
export class BillItemComponent  {
  isAddingNewItem() {
    throw new Error('Method not implemented.');
    }

      class_quantity: string = "peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
      isFormReady: boolean = false;
      buttonMessage:string="Save";
      class_identificator: string = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600" ;
      class_ingredient: string = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600" ;
      class_name: string = "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
      class_description: string = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600";
      class_description_input="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-2";
      billSelectedSubscription:Subscription= new Subscription();
      billSelected?:BillModel | undefined | null;
      lineForm: FormGroup;
      billSubscription:Subscription=new Subscription();
      bills:BillModel[]|null|undefined =[];
      billLines:BillLineModel[] = [];
      filteredStatus:string ='';

      totalCost:number=1;
      consumerPrice:number=1;
      lineProfit:number=1;

      @Output() closeFormToAddItem= new EventEmitter<BillLineModel|null>();

      constructor(private billService:BillService, private router:Router, private activeRoute:ActivatedRoute, private customerService:CustomerService, private calculateService:CalculateService) {

        this.lineForm= new FormGroup({
          identificator: new FormControl(this.billSelected?this.billSelected.identificator:"", [Validators.required,this.validateidentificator ]),
          product: new FormControl("", [Validators.required, this.validateName]),
          size: new FormControl("", [Validators.required/*, this.validateName*/]),
          quantity: new FormControl("",[Validators.required, this.validateNumbers, Validators.min(0)]),
          price: new FormControl("",[Validators.required, this.validateNumbers, Validators.min(0)]),
          totalCost: new FormControl(this.calculate(),[Validators.required, Validators.pattern("/^\d+$/")/*,this.validateDescription*/]),
          delivery: new FormControl("",[Validators.required, this.validateNumbers, Validators.min(0)]),
          lineProfit: new FormControl("",[Validators.required, Validators.pattern("/^\d+$/")/*,this.validateDescription*/]),
          consumerPrice: new FormControl("",[Validators.required, Validators.pattern("/^\d+$/")/*,this.validateDescription*/])
        });

        this.lineForm.get('quantity')?.valueChanges.subscribe((total) => {
          // Lo que desees hacer
              //console.log(this.lineForm.get('quantity')?.value);
              this.calculate();

          });

        this.lineForm.get('price')?.valueChanges.subscribe((total) => {
            // Lo que desees hacer
            //console.log(this.lineForm.get('price')?.value);
            this.calculate();
          });
        this.lineForm.get('delivery')?.valueChanges.subscribe((total) => {
            // Lo que desees hacer
            //console.log(this.lineForm.get('delivery')?.value);
            this.calculate();
        });
      }



      ngOnInit(): void {
        //throw new Error('Method not implemented.');
        //this.customers=this.customerService.getCustomerList();
      }
      ngOnDestroy(): void {
        this.billSelectedSubscription.unsubscribe();
        //throw new Error('Method not implemented.');
      }


      calculate(){
        if(this.lineForm!=undefined){
          //alert(this.lineForm.get('delivery')?.value + " "+ this.lineForm.get('price')?.value+ "  "+this.lineForm.get('quantity')?.value)
        if(this.lineForm.get('quantity')?.value&&this.lineForm.get('price')?.value&&this.lineForm.get('delivery')?.value){
          this.lineForm.patchValue({totalCost:this.calculateService.calulateTotalCost(this.lineForm.get('quantity')?.value, this.lineForm.get('delivery')?.value, this.lineForm.get('price')?.value)});
          this.lineForm.patchValue({lineProfit:this.calculateService.calulateLineProficient(this.lineForm.get('quantity')?.value, this.lineForm.get('delivery')?.value, this.lineForm.get('price')?.value)});
          this.lineForm.patchValue({consumerPrice:this.calculateService.calulateConsumerPrice(this.lineForm.get('quantity')?.value, this.lineForm.get('delivery')?.value, this.lineForm.get('price')?.value)});
        }

         }

      }

      validateidentificator(control: AbstractControl): any[] {
        const value=control.value;
        let errors:any[]=new Array();
        console.log( /^-?\d+$/.test(value));

        if(value!==null && !/^-?\d+$/.test(value)){
          errors.push('Please a valid identificator');
        }
        return errors;
      }

      validateNumbers(control: AbstractControl): any[] {

        const value=control.value;
        let errors:any[]=new Array();
        //console.log( /^-?\d+$/.test(value));
        if(value!==null && !/^-?\d+$/.test(value)){
          errors.push('Please a valid number');
        }
        //this.calculateTotalCost();
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
        const value= this.lineForm.get(controlName);
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


          if (controlName == "identificator") {
            this.class_identificator = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-red-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600 peer-focus:border-red-600";
            //this.class_identificator="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-600 appearance-none dark:text-white dark:border-red-600 dark:focus:border-red-600 focus:outline-none focus:ring-0 focus:border-red-600 peer";
            return error;
          }
        }

        controlName=="name"&&(this.class_name = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
                              this.class_name= "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer");

        return error;
      }

      removeBillLine(bill:BillLineModel){

      }

      selectCustormertoBill(customer:CustomerModel) {
        this.lineForm.controls["name"].setValue(customer.name);
        this.lineForm.controls["name"].touched;
      }

      // isNameCompleteOrEmpty():boolean{
      //   if(!this.lineForm.value.name)return true;
      //   if(this.lineForm.value.name){
      //     if(this.customers?.find(customer => customer.name == this.lineForm.value.name))return true;
      //   }
      //   return false;
      // }

      closingFormToAddItem():void{
          this.closeFormToAddItem.emit(null);
      }

      onSubmit():void{
        this.closeFormToAddItem.emit(new BillLineModel(this.lineForm.value.product, this.lineForm.value.size, this.lineForm.value.quantity, this.lineForm.value.price, this.lineForm.value.delivery, this.lineForm.value.totalCost, this.lineForm.value.lineProfit));
       this.buttonMessage=="Save"?this.customerService.addNewCustomer(new CustomerModel(this.lineForm.value.identificator, this.lineForm.value.name, this.lineForm.value.address,this.lineForm.value.phone)):"";
       this.buttonMessage=="Update"?this.customerService.updateCustomer(new CustomerModel(this.lineForm.value.identificator, this.lineForm.value.name, this.lineForm.value.address,this.lineForm.value.phone)):"";

      }

}
