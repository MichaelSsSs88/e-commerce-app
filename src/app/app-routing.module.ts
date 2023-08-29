import { CustomerComponent } from '../pages/customers/customer/customer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/pages/auth/auth.component';
import { BillDetailComponent } from 'src/pages/bills/bill-detail/bill-detail.component';
import { BillEditComponent } from 'src/pages/bills/bill-edit/bill-edit.component';
import { BillComponent } from 'src/pages/bills/bill/bill.component';
import { CustomerDetailComponent } from 'src/pages/customers/customer-detail/customer-detail.component';
import { CustomerEditComponent } from 'src/pages/customers/customer-edit/customer-edit.component';

const routes: Routes = [
  {path: 'home',component: AuthComponent},
  {path: 'customer', component:CustomerComponent, children:[
    {path:'', component:CustomerDetailComponent},
    {path:'new', component:CustomerEditComponent},
    {path:':id/edit', component:CustomerEditComponent},
    {path:':id', component:CustomerDetailComponent}

  ]},
  {path: 'bill', component: BillComponent, children:[
    {path:'', component:BillDetailComponent},
    {path:'new', component:BillEditComponent},
    {path:':id/edit', component:BillEditComponent},
    {path:':id', component:BillDetailComponent}
  ]},
  {path:'saved',redirectTo: '/customer'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
