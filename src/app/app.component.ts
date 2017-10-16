import { Component, Pipe, PipeTransform ,OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import{FilterPipe} from './filter.pipe';

@Pipe({ name: 'objngfor',  pure: false })
export class ObjNgFor implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => Object.assign({ key }, value[key]));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent{

constructor(private afAuth:AngularFireAuth,
  public db: AngularFireDatabase) {
}

    ngOnInit() {

  }



}
