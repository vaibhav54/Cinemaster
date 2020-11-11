import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	   name:string = '';
    value = '';
    url:string = '';
    movieData;
    sign_out:boolean = false;


  constructor(private httpClient:HttpClient, public router:Router) {
      this.get_userState();
   }
     get_userState(){
        firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        console.log('user form navbar',user);
        this.sign_out = true;
      } else {
        // No user is signed in.
        console.log('no user');

      }
    });
   }
    signout(){
      firebase.auth().signOut()
      .then(()=>{
        console.log('signed out');
        this.router.navigate(['/signin']);
        })
      .catch((error)=>{
       console.log(error) ;
       });
    }
    onNameKeyUp(event:any){
      this.name = event.target.value;
    }
    onEnter(value){
     this.value = value; 
     this.onClick();
    }
  
    onClick(){
      console.log(this.name);
      this.url = 'https://www.omdbapi.com/?t=' + this.name +'&apikey=8d631ed2';
      var id;
      var url_id;
      this.httpClient.get(this.url)
      .subscribe((data:any [])=>{
        this.movieData = data;
        console.log(this.movieData);
        id = this.movieData.imdbID;
       
        // console.log(data.Title);
        // this.movie_title  = this.movieData.Title;
        // console.log('movie name', this.movie_title);
        this.router.navigate(['/movieinfo/' +id ])
  
      })
    }

  ngOnInit() {
  }


}
