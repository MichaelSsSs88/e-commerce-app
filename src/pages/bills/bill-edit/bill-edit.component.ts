import { Component, OnDestroy, OnInit } from '@angular/core';
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
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.component.html',
  styleUrls: ['./bill-edit.component.css']
})
export class BillEditComponent implements OnInit, OnDestroy{


  isVisibleFormToAddItem:boolean = false;
  isVisibleBillDetails:boolean = true;
  class_quantity: string = "peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  isFormReady: boolean = false;
  buttonMessage:string="Save";
  class_identification: string = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600" ;
  class_ingredient: string = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600" ;
  class_name: string = "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  class_description: string = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600";
  class_description_input="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-2";
  customerSelectedSubscription:Subscription= new Subscription();
  billSelectedSubscription:Subscription= new Subscription();
  billSeleted?:BillModel|null;
  customerSeleted?:CustomerModel|null;
  billForm: FormGroup;
  customerSubscription:Subscription=new Subscription();
  customers:CustomerModel[]|null|undefined =[];
  billLinesList:BillLineModel[] = [];
  filteredStatus:string ='';

  itemStart:number=1;
  itemEnd:number=2;
  pageInView:number=1;





  constructor(private billService:BillService, private router:Router, private activeRoute:ActivatedRoute, private customerService:CustomerService, private calculateService:CalculateService) {
     this.billSelectedSubscription= this.billService.billSelectedEvent.subscribe((billSelected:BillModel|undefined|null)=>{
          billSelected&&this.router.url.match("edit")&&(this.billSeleted= billSelected, this.buttonMessage="Update");
          !this.router.url.match("edit")&&(this.buttonMessage="Save");
    });
    // this.customerSelectedSubscription= this.customerService.customerSelectedEvent.subscribe((customerSelected:CustomerModel|undefined|null)=>{
    //       customerSelected&&this.router.url.match("edit")&&(this.customerSeleted= customerSelected, this.buttonMessage="Update");
    //       !this.router.url.match("edit")&&(this.buttonMessage="Save");
    // });
    this.customerSubscription= this.customerService.customersEvent.subscribe((customers:CustomerModel[]|null|undefined)=>{
          this.customers= customers;

    });
    this.billForm=this.inicializarForm();
    //this.visibleBillDetail();

  }


  nextPage():number{
    console.log(this.pageInView+1);
    this.pageInView++;
    return this.pageInView;
  }

  maxPage():number{
   console.log(this.pageInView==(this.billLinesList.length>0?Math.ceil(this.billLinesList.length/2):1));

    return this.billLinesList.length>0?Math.ceil(this.billLinesList.length/2):1;
  }

  previousPage():number{
    this.pageInView--;
    return this.pageInView;
  }

  inicializarForm():FormGroup{
    this.billSeleted&&(this.billLinesList=this.billSeleted.billLines);
    return new FormGroup({
      billNumber: new FormControl(this.billSeleted?this.billSeleted.identificator:Date.now(), [Validators.required,this.validateIdentification ]),
      dolarToColonValue: new FormControl(this.calculateService.dolarPrice, [Validators.required,this.validateIdentification ]),
      date: new FormControl(this.billSeleted?this.billSeleted.date:new Date().toLocaleDateString(), [Validators.required,this.validateIdentification ]),
      identification: new FormControl(this.billSeleted?this.billSeleted.customer.identification:this.customerSeleted?this.customerSeleted.identification:"", [Validators.required,this.validateIdentification ]),
      name: new FormControl(this.billSeleted?this.billSeleted.customer.name:this.customerSeleted?this.customerSeleted.name:"", [Validators.required, this.validateName]),
      address: new FormControl(this.billSeleted?this.billSeleted.customer.address:this.customerSeleted?this.customerSeleted.address:"", [Validators.required/*, this.validateName*/]),
      phone: new FormControl(this.billSeleted?this.billSeleted.customer.phone:this.customerSeleted?this.customerSeleted.phone:"",[Validators.required/*,this.validateDescription*/]),
      totalPrice: new FormControl(this.billSeleted?this.billSeleted.total:0,[Validators.required/*,this.validateDescription*/]),
    });
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.customers=this.customerService.getCustomerList();
  }
  ngOnDestroy(): void {
    this.customerSelectedSubscription.unsubscribe();
    //throw new Error('Method not implemented.');
  }

 visibleBillDetail(){
  //this.isVisibleBillDetails=false;
    setTimeout(() => {
        this.isVisibleBillDetails=false;
    }, 2000);
  }

  showBillDetails() {
    this.isVisibleBillDetails=true;
    //this.visibleBillDetail();
    }

  validateIdentification(control: AbstractControl): any[] {
    const value=control.value;
    let errors:any[]=new Array();


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
    const value= this.billForm.get(controlName);
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

  removeBillLine(bill:BillLineModel){
    this.billLinesList=this.billLinesList.filter(line => line!=bill);
    this.billForm.controls["totalPrice"].setValue(this.billForm.value.totalPrice-bill.totalCost-bill.totalEarning);
  }
  isAddingNewItem():void {

    this.isVisibleFormToAddItem=true;

  }

  selectCustormertoBill(customer:CustomerModel|null) {
    if(customer){
      this.customerSeleted=customer;
      this.billForm.controls["name"].setValue(customer.name);
      this.billForm.controls["address"].setValue(customer.address);
      this.billForm.controls["phone"].setValue(customer.phone);
      this.billForm.controls["name"].touched;
    }else{
      this.customerSeleted=null;
      this.customerService.setCustomerSelected=null;
      this.billForm=this.inicializarForm();
    }

  }

  isNameCompleteOrEmpty():boolean{
    if(!this.billForm.value.name){return true};
    if(this.billForm.value.name){
      if(this.customers?.find(customer => customer.name == this.billForm.value.name))return true;
    }


    return false;
  }

  closeFormToAddItem($event:BillLineModel|null){

      this.isVisibleFormToAddItem = false;
      if($event){
        this.billLinesList.push($event);
        this.billForm.controls["totalPrice"].setValue(this.billForm.value.totalPrice+$event.totalEarning+$event.totalCost);
      }
  }

  addBillLine(billLine:BillLineModel){

  }

  onSubmit():void{
    //alert(this.billForm.value.identification);
    if(this.buttonMessage=="Save"){
      this.customerSeleted&&this.billService.addNewBill(new BillModel(this.billForm.value.billNumber,this.customerSeleted, this.billLinesList, this.billForm.value.dolarToColonValue, this.billForm.value.totalPrice , this.billForm.value.date));
      this.customerSeleted=null;
      this.billLinesList=[];
      this.selectCustormertoBill(null);
    }
   if(this.buttonMessage=="Update"){
    this.billSeleted?.customer&&this.billService.updateBill(new BillModel(this.billForm.value.billNumber,this.billSeleted?.customer, this.billLinesList, this.billForm.value.dolarToColonValue, this.billForm.value.totalPrice , this.billForm.value.date));
   }
  }

}
