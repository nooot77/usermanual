import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

posts:FirebaseListObservable<any[]>;
post:FirebaseObjectObservable<any>;
 folder: any;
 id:any;
  constructor(private af:AngularFireModule, public db: AngularFireDatabase,afAuth: AngularFireAuth) {
    this.posts=this.getPosts();
  this.posts= db.list('posts')as FirebaseListObservable<Posts[]>
  this.folder='images';


  }

    getPosts(){
       return this.posts;
    }

    getPostDetails(id){
    this.post=this.db.object('/posts/'+id)as FirebaseObjectObservable<Posts>
    return this.post;

    }
    addPost(post){
    // Create root ref

          return this.posts.push(post).orderByChild;



  }


  updatePost(id, post){
    return this.posts.update(id, post);
  }

  deletepost(id){
    return this.posts.remove(id);
  }

}


interface Posts{
    $key?:number;
    $uid?:number;
    title?:string;
    body?:string;
    img?:string;
    path?:string;
}
