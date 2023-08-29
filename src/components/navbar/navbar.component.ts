import { Component, HostListener, Output, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnChanges } from '@angular/core';
//import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  isMenuOpen: boolean = true;
  isAuth: boolean = true;
  //user: User=null;
 // userSubscription: Subscription;

  //@Output() openMenu:boolean = window.innerWidth>770;
//
// constructor(private authService: AuthService, private authenticationService:AuthenticationService , private router: Router){
//   this.userSubscription=this.authenticationService.userT.subscribe((user:User) =>{
//       this.user= user;
//       console.log(user);
//       this.isAuth=true;

//   });
//}

  ngOnInit(): void {
  //  this.isAuth= this.authService.loggedIn;
  }
  ngOnDestroy(): void {
    // this.userSubscription.unsubscribe();
  }

  loggin=()=>{

    // this.authService.loggin();
    // this.router.navigate(['home']);
  }

  loggout=()=>{
    // this.authenticationService.signOut();
    // this.isAuth=false;
    // this.isOpen=false;
    // this.router.navigate(['login']);

  }


  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    console.log(event.target.innerWidth)
    event.target.innerWidth>767?this.isMenuOpen=true:this.isMenuOpen=false;
  }


}
