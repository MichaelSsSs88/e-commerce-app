import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
//import { AuthComponent } from 'src/pages/auth/auth.component';
import { LoadingComponent } from 'src/components/loading/loading.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { AuthComponent } from 'src/pages/auth/auth.component';
import { CustomerComponent } from 'src/pages/customers/customer/customer.component';
import { CustomerService } from 'src/services/customer.service';
import { CustomerListComponent } from 'src/pages/customers/customer-list/customer-list.component';
import { FilterPipe } from 'src/pipes/filter.pipe';
import { CustomerItemComponent } from 'src/pages/customers/customer-item/customer-item.component';
import { CustomerEditComponent } from 'src/pages/customers/customer-edit/customer-edit.component';
import { BillComponent } from 'src/pages/bills/bill/bill.component';
import { BillDetailComponent } from 'src/pages/bills/bill-detail/bill-detail.component';
import { BillEditComponent } from 'src/pages/bills/bill-edit/bill-edit.component';
import { BillItemComponent } from 'src/pages/bills/bill-item/bill-item.component';
import { BillListComponent } from 'src/pages/bills/bill-list/bill-list.component';
import { FilterObject } from 'src/pipes/filter-object.pipe';
import { PlaceholderDirective } from 'src/directives/placeholder.directive';
import { AlertComponent } from 'src/components/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoadingComponent,
    AuthComponent,
    CustomerComponent,
    CustomerListComponent,
    CustomerItemComponent,
    CustomerEditComponent,
    BillComponent,
    BillDetailComponent,
    BillEditComponent,
    BillItemComponent,
    BillListComponent,
    FilterPipe,
    FilterObject,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    CustomerService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
