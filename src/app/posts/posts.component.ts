import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../shared/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
 posts:any;
  constructor(private firebaseService:FirebaseService,public db: AngularFireDatabase,public flashMessege:FlashMessagesService) { }

  ngOnInit() {
    this.firebaseService.getPosts().subscribe(posts => {
          
          this.posts = posts;
        });
  }



}
