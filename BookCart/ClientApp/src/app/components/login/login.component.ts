import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  showPassword = true;
  userId;
  userDataSubscription: any;

  signIn: any;
  signUp: any;
  signInForm: any;
  signUpForm: any;
  overlay_container: any;
  overlay: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private subscriptionService: SubscriptionService) { }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.userDataSubscription = this.subscriptionService.userData.asObservable().subscribe((data: User) => {
      this.userId = data.userId;
    });
  }

  ngAfterViewInit() {

    this.signIn = document.querySelector('#signInButton');
    this.signUp = document.querySelector('#signUpButton');
    this.signInForm = document.querySelector('.container .sign-in-form');
    this.signUpForm = document.querySelector('.container .sign-up-form');
    this.overlay_container = document.querySelector('.container .overlay-container');
    this.overlay = document.querySelector('.container .overlay-container .overlay');
  }
  loginContainerClicked() {
    this.overlay_container.style.transform = 'translateX(100%)';
    this.overlay.style.transform = 'translateX(-50%)';
    this.signInForm.classList.add('active');
    this.signUpForm.classList.remove('active');
  }
  signUpContainerClicked() {
    this.overlay_container.style.transform = 'translateX(0)';
    this.overlay.style.transform = 'translateX(0)';
    this.signUpForm.classList.add('active');
    this.signInForm.classList.remove('active');
  }

  login() {
    if (this.loginForm.valid) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.authenticationService.login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          () => {
            this.setShoppingCart();
            this.router.navigate([returnUrl]);
          },
          () => {
            this.loginForm.reset();
            this.loginForm.setErrors({
              invalidLogin: true
            });
          });
    }
  }

  setShoppingCart() {
    this.cartService.setCart(this.authenticationService.oldUserId, this.userId).subscribe(result => {
      this.userService.cartItemcount$.next(result);
    }, error => {
      console.log('Error ocurred while setting shopping cart : ', error);
    });
  }

  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
}
