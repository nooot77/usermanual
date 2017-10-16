import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',

  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
   key?:number;
   title:any;
    body:any;
    img:any;
    path:any;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) {

  }

  ngOnInit() {
  }

  onAddSubmit(id){

     let post = {
      title: this.title,
      body: this.body,

    }

    this.firebaseService.addPost(post);
    this.router.navigate(['posts']);


}
}
