import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
    id;
    title;
    body;
    img;
  constructor(
    private firebaseService:FirebaseService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
     this.firebaseService.getPostDetails(this.id).subscribe(post => {
     this.title = post.title;
     this.body = post.body;
     this.img = post.img;

   });
  }
  onEditSubmit(){
    let post = {
        title: this.title,
        body: this.body,
        img: this.img

    }

    this.firebaseService.updatePost(this.id, post);

    this.router.navigate(['/posts']);
  }

}
