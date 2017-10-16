import { Component,NgModule, OnInit, Pipe, PipeTransform } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../shared/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {MatToolbarModule} from '@angular/material';
import {FilterPipe} from '../filter.pipe';
import { ActivatedRoute, Params } from '@angular/router';
   import * as firebase from 'firebase';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],

})
export class SidebarComponent implements OnInit {
  posts:any;
   constructor(private firebaseService:FirebaseService,    private route: ActivatedRoute, public db: AngularFireDatabase,public flashMessege:FlashMessagesService,) { }
  ngOnInit() {
    this.firebaseService.getPosts().subscribe(posts => {
          this.posts = posts;
        });
  }

}
