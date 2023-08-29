import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CustomerModel } from 'src/models/customer/customer.model';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit{
  index:number=-1;
  subscriber: Subscription;
  isListVisible:Boolean=false;
  customers:CustomerModel[]=[];
  customersDetectChange:Subscription= new Subscription();
  filteredStatus:string ='';

  constructor(private customerService:CustomerService,private router:Router, private activedRoute:ActivatedRoute){
    this.customers= this.customerService.getCustomerList();
    this.subscriber = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.index=this.activedRoute.snapshot.params['id'];
      console.log(this.activedRoute.snapshot.firstChild?.url);
      this.activedRoute.snapshot.firstChild?.url.toString().includes('edit')||
      this.activedRoute.snapshot.firstChild?.url.toString().includes('new')?
      (this.isListVisible=false):(this.isListVisible=true);



      console.log(this.isListVisible);


    });

    this.customersDetectChange= this.customerService.customersEvent.subscribe((customers:CustomerModel[]|null|undefined)=>{
        this.customers=this.customerService.getCustomerList();;
    })
  }

  ngOnInit(): void {

  }

  createCustomer(){

      this.router.navigate(['customer','new'])

  }

  editCustomer(customer:CustomerModel){
      this.customerService.setCustomerSelected=customer;
      this.router.navigate(['customer',customer.identification,'edit'])
  }



}
