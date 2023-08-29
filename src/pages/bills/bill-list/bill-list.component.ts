import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { BillModel } from 'src/models/bill/bill.model';
import { BillService } from 'src/services/bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit{
  index:number=-1;
  subscriber: Subscription;
  isListVisible:Boolean=false;
  bills:BillModel[]=[];
  billsDetectChange:Subscription= new Subscription();
  filteredStatus:string ='';


  constructor(private billService:BillService,private router:Router, private activedRoute:ActivatedRoute){
    this.bills= this.billService.billsList;
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

    this.billsDetectChange= this.billService.billServiceListEvent.subscribe((bill:BillModel[]|null|undefined)=>{
        bill&&(this.bills=bill);
    })
  }

  ngOnInit(): void {

  }

  createBill(){

      this.router.navigate(['bill','new'])

  }

  editCustomer(bill:BillModel){
      this.billService.setBillSelected=bill;
      this.router.navigate(['bill',bill.identificator,'edit'])
  }

}
