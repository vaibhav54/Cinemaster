import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';
import { provideRoutes} from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import {HttpClientModule} from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { HomepageComponent } from './homepage/homepage.component';
// import { SignupComponent } from './signup/signup.component';
// import { FeedComponent } from './homepage/feed/feed.component';
import { MovieinfoComponent } from './homepage/movieinfo/movieinfo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommentComponent } from './homepage/comment/comment.component';
import { RecommendationComponent } from './homepage/recommendation/recommendation.component';

  var firebaseConfig = {
    apiKey: "AIzaSyCWCFhek4GqYTx5U-JpqpFCowAkzWBgmJE",
    authDomain: "cinemaster-e660e.firebaseapp.com",
    databaseURL: "https://cinemaster-e660e.firebaseio.com",
    projectId: "cinemaster-e660e",
    storageBucket: "cinemaster-e660e.appspot.com",
    messagingSenderId: "490902797004",
    appId: "1:490902797004:web:81e598092b27a036a6a069",
    measurementId: "G-SDYDC4E7KR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    SigninComponent,
    HomepageComponent,
    // SignupComponent,
    // FeedComponent,
    MovieinfoComponent,
    NavbarComponent,
    CommentComponent,
    RecommendationComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
