
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router ,NavigationExtras } from "@angular/router";
import {FlashMessagesService} from 'angular2-flash-messages';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService} from '../shared/auth.service';
import {FormGroup ,FormBuilder,Validators} from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

invalidLogin: boolean;
authState: any = null;
message: string;
email:any;
password:any;

  constructor(public authService: AuthService,private afAuth: AngularFireAuth, private db: AngularFireDatabase,
  private router:Router,public flashMessage:FlashMessagesService
 ) {

 }
   ngOnInit() {

}
setMessage() {
  this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
}

loginat() {
  this.message = 'Trying to log in ...';

  this.authService.loginat().subscribe(() => {
    this.setMessage();
    if (this.authService.isLoggedIn) {
      // Get the redirect URL from our auth service
      // If no redirect has been set, use the default
      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/a';

      // Set our navigation extras object
      // that passes on our global query params and fragment
      let navigationExtras: NavigationExtras = {
        queryParamsHandling: 'preserve',
        preserveFragment: true
      };

      // Redirect the user
      this.router.navigate([redirect], navigationExtras);
    }
  });
}


     login() {
let user={
  email:this.email,
  password:this.password
}

        return this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)

          .then((user) => {
            this.authState = user
            this.updateUserData()
            this.flashMessage.show('You are logged in',
    {cssClass: 'alert-success', timeout: 3000});

          })
          .catch(error => console.log(error));


     }



     private updateUserData(): void {
     // Writes user name and email to realtime db
     // useful if your app displays information about users or for admin features

       let path = `users/${this.currentUserId}`; // Endpoint on firebase
       let data = {
                     email: this.authState.email,
                     name: this.authState.displayName
                   }

       this.db.object(path).update(data)
       .catch(error => console.log(error));



   }
   get authenticated(): boolean {
       return this.authState !== null;
   }
   get currentUser(): any {
       return this.authenticated ? this.authState : null;
   }
   get currentUserObservable(): any {
       return this.afAuth.authState
   }
   get currentUserId(): string {
      return this.authenticated ? this.authState.uid : '';
   }
   get currentUserAnonymous(): boolean {
       return this.authenticated ? this.authState.isAnonymous : false
   }
   get currentUserDisplayName(): string {
      if (!this.authState) { return 'Guest' }
      else if (this.currentUserAnonymous) { return 'Anonymous' }
      else { return this.authState['displayName'] || 'User without a Name' }
   }

}
