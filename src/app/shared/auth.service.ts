
import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router ,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
@Injectable()
export class AuthService {





  authState: any = null;
  user:Observable<firebase.User>;
  private loggedIn: boolean;
constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,
private router:Router) {

              this.afAuth.authState.subscribe((auth) => {
                this.authState = auth
                this.loggedIn = (auth != null);
  });
  }


logout() {
  this.afAuth.auth.signOut();
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


  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin(){
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.authState = credential.user
          this.updateUserData()
      })
      .catch(error => console.log(error));
  }


  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
    .then((user) => {
      this.authState = user
      this.updateUserData()
    })
    .catch(error => console.log(error));
}

  emailSignUp(email:string, password:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  emailLogin(email:string, password:string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user
         this.updateUserData()
       })
       .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }


  //// Helpers ////

  private updateUserData(): void {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features

    let path = `users/${this.currentUserId}`; // Endpoint on firebase
    let data = {
                  email: this.authState.email

                }

    this.db.object(path).update(data)
    .catch(error => console.log(error));

}

isLoggedIn = false;

// store the URL so we can redirect after logging in
redirectUrl: string;

loginat(): Observable<boolean> {
  return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
}

logoutat(): void {
  this.isLoggedIn = false;
}



}

interface Users{
  id?:string;
  email:string;
  password:string;
}
