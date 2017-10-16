import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    id:any;
    post: any;
    imgUrl:any;

    constructor(
      private firebaseService: FirebaseService,
      private router:Router,
      private route:ActivatedRoute
    ) { }

    ngOnInit() {
      // Get ID
      this.id = this.route.snapshot.params['id'];

      this.firebaseService.getPostDetails(this.id).subscribe(post => {
        this.post = post;

        let storageRef = firebase.storage().ref();
        let spaceRef = storageRef.child(this.post.path);
        storageRef.child(this.post.path).getDownloadURL().then((url) => {
          // Set image url
          this.imgUrl = url;
        }).catch((error) => {
          console.log(error);
        });

      });
    }

    onDeleteClick(){
      this.firebaseService.deletepost(this.id);

      this.router.navigate(['/posts']);
    }

  }
