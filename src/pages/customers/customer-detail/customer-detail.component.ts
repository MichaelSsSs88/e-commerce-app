import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent {
  index:number=-1;
  subscriber: Subscription;

  constructor(private router:Router, private activedRoute:ActivatedRoute){
    this.subscriber = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.index=this.activedRoute.snapshot.params['id'];
      //this.recipeSelected = this.recipeService.getRecipeById(this.index);
    });
  }

}
