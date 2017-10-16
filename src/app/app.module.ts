import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule,Routes} from '@angular/router';
import {FirebaseService} from './services/firebase.service'
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {CKEditorModule} from 'ng2-ckeditor';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import { FilterPipe } from './filter.pipe';
import { HighlightPipe } from './highlight.pipe';
import { UsersComponent } from './users/users.component';
import { SingupComponent } from './singup/singup.component';
import {AuthGuard} from './core/auth.guard';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes:Routes = [
    {path:'',component:HomeComponent},
    {path:'posts',component:PostsComponent},
    {path:'post/:id', component:HomeComponent,pathMatch: 'full'},
    {path:'add-post',component:AddPostComponent},
    {path:'edit-post/:id',component:EditPostComponent,canActivate:[AuthGuard]},
    {path:'login',component:LoginComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    PostComponent,
    AddPostComponent,
    EditPostComponent,
    NavbarComponent,
    LoginComponent,
    SidebarComponent,
    FilterPipe,
    HighlightPipe,
    UsersComponent,
    SingupComponent,
    FooterComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MdButtonModule, MdCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot() ,
    FlashMessagesModule,
    AngularFireModule.initializeApp(environment),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [MdButtonModule, MdCheckboxModule,FilterPipe],
  providers: [AuthService,FirebaseService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
