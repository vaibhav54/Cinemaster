import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user:any ;
  constructor(public router:Router){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.displayName);
      } else {
        // No user is signed in.
        console.log('no user');
        router.navigate(['/signin']);

      }
    });
} 


}
