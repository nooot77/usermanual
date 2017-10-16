import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as firebase from 'firebase';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

      id:any;
      post: any;
      imgUrl:any;
  constructor(
    private firebaseService: FirebaseService,
    private router:Router,
    private route:ActivatedRoute,
    private sanitizer: DomSanitizer
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
