import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from "@angular/router";
import {FlashMessagesService} from 'angular2-flash-messages';
import {MatToolbarModule} from '@angular/material';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    authState: any = null;
    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,
    private router:Router,public flashMessage:FlashMessagesService) {


  }

  ngOnInit() {

  }

  login(email:string, password:string) {
    var email = "nooot77@gmail.com";
    var password = "1122334455";

     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user
         console.log(user);
         this.updateUserData()
         this.flashMessage.show('You are logged in',
        {cssClass: 'alert-success', timeout: 3000});

       })
       .catch(error => console.log(error));

  }
  logout() {
    firebase.auth().signOut().then(function() {
        this.router.navigate(['/']);
      this.flashMessage.show('You are logged out',
     {cssClass: 'alert-success', timeout: 3000});
  }, function(error) {
    this.flashMessage.show('Error',
   {cssClass: 'alert-success', timeout: 2000});
  });
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
   return this.authenticated ? this.authState.uid : 'yes';
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
