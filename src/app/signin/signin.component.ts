import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
	email;
	password;
	displayname;
	user:any;
	uid:any;
	url = 'https://newsapi.org/v2/top-headlines?'+'country=us&' + 'apiKey=131317e9b9514cdd8b0aed89a5ed105c';
    req = new Request(this.url);  
  constructor(private router:Router) { }

  email_signin(){
	  console.log(this.email,this.password);
	  firebase.auth().signInWithEmailAndPassword(this.email, this.password)
	  .then(()=>{
		  console.log('signed in');
	  })
	  .catch((error)=> { 
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
	  });
	// firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
	// .then(()=>{
	// 	this.user = firebase.auth().currentUser;

	// 	if (this.user) {
	// 	this.uid = this.user.uid;
	// 	console.log("valid user");
	// 	console.log(this.user);
	// 	console.log(this.user.email);

	// 	console.log("user ID: ",this.uid);
	// 	console.log("logged in");
	// 	}
		
	// 	else{
	// 	console.log("login failed");
	// 	}

		// this.adduser();
		// console.log("Signed In");
		// console.log(this.user);
	// })

}
google_signin(){
	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then((result)=> {
		// This gives you a Google Access Token. You can use it to access the Google API.
		// var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		console.log(user);
		console.log('done');
		console.log(result);
		this.router.navigate(['/']);

		// ...
	  }).catch((error)=> {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
		console.log(error);
		console.log('eror');
	  });
}
facebook_signin(){
	var provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider).then((result)=> {
		// This gives you a Facebook Access Token. You can use it to access the Facebook API.
		// var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		console.log('done')
		console.log(result)
		// ...
	  }).catch((error)=> {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
	  });
}
ngOnInit() {
  }
}
