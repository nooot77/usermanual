import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot ,Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../shared/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(private auth:AuthService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      if(this.auth.authenticated){
        return true;
      }
      console.log('acsses denied!')
      this.router.navigate(['/login']);
      return false;

  }
}
