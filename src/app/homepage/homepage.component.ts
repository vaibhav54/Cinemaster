import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'; 


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
    title = 'Cinemaster';
    like:boolean = false;
    movie_title: string = '';
    name:string = '';
    value = '';
    url:string = '';
    movieData ;
    news_url:string = '';
    newsData :any[];
    content:any = '';
    file: File;
    x = 1; progess;
    metaData:any;
    data:any[] = [];

    constructor(private httpClient:HttpClient,private router:Router){
      this.get_userState();
      this.get_news_api();
      this.get_posts();
    } 
   get_userState(){
        firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        console.log(user);
        console.log(user.displayName);
      } else {
        // No user is signed in.
        console.log('no user');
        window.alert("SignIn First");
        this.router.navigate(['/signin']);

      }
    });
   }
   liked(){
     if(this.like){
       this.like = false;
     }else{
       this.like=true;
     }
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
    get_news_api(){
      //google news data
      this.news_url = 'https://newsapi.org/v2/top-headlines?'+
      'q=movie&' +
      // 'country=us&'+

      // 'from=2018-10-03&' +
      // 'sortBy=popularity&' +
      'apiKey=131317e9b9514cdd8b0aed89a5ed105c';
      
      this.httpClient.get(this.news_url)
      .subscribe((data:any [])=>{
        this.newsData = data['articles'];
        console.log('newsdata');
        console.log(this.newsData); 
      })
    }
    get_posts(){
      firebase.firestore().collection("posts")
      .orderBy("time","desc").get()
      .then((querySnapshot)=> {
      querySnapshot.forEach((doc)=>{
        this.data.push(doc.data());
          // console.log(doc.data());
      });
       // console.log(this.data);

});
        // console.log(firebase.auth().currentUser);

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


   featuredPhotoSelected(event:any){
    this.file = event.target.files[0];
    console.log("selected filename",this.file.name);
    this.metaData = {'contentType' : 'image/jpg'};
    console.log(this.file);
  }

  
   create_post(){
     if(this.file){
        var content_new = this.content; 
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child('/posts/IMG' + this.file.name)
        .put(this.file, this.metaData);         
        
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },function(error){
            console.log(error);
        },function(){
            uploadTask.snapshot.ref.getDownloadURL().
            then(function(downloadURL) {
            var flag:boolean = true;
            let photourl :string = '';  
            console.log('File available at', downloadURL);
            photourl = downloadURL;


                   const ref = firebase.firestore().collection('posts').doc()
                   console.log("post id maybe",ref)


            firebase.firestore().collection("posts").add({
              content:content_new,
              img_url:photourl,
              time: firebase.firestore.FieldValue.serverTimestamp(),
              user_id:firebase.auth().currentUser.uid,
              user_name: firebase.auth().currentUser.displayName,
              user_photoURL: firebase.auth().currentUser.photoURL,

        }).then(()=>{
          console.log("image and content uploaded");
          this.update_posts();
          console.log(this.data);
          window.location.reload();
        })
        })
      
        })
     }
else{
            const ref = firebase.firestore().collection('posts').doc()
            console.log("post id maybe",ref)
            console.log("post id maybe",ref.firestore.app)


var temp = firebase.firestore().collection("posts").add({
        content:this.content,
        img_url:null,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        user_id:firebase.auth().currentUser.uid,
        user_name: firebase.auth().currentUser.displayName,
        user_photoURL: firebase.auth().currentUser.photoURL,

  });
console.log('heiheug',temp)

// console.log('temppppp value',temp.)
// console.log('tempppppppppppppppppp',temp.__zone_symbol__state)
// console.log('haging on',temp.__zone_symbol__value.id)
console.log('type',typeof(temp))
// temp.then(()=>{
//     console.log("content uploaded");
//     this.update_posts();
//     console.log(this.data);
//     // window.location.reload();

//   }).catch((error)=>{
//     console.log(error);
//   })                   
  }
}
update_posts(){
  firebase.firestore().collection('posts')
  .orderBy('time','desc').get()
  .then((data)=>{
    console.log(data.docs[0].data());
    this.data.push(data.docs[0].data());
  })
}
ngOnInit() {
      // this.get_posts();

    } 

}
