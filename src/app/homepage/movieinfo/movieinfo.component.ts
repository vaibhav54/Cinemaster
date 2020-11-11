import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-movieinfo',
  templateUrl: './movieinfo.component.html',
  styleUrls: ['./movieinfo.component.css']
})
export class MovieinfoComponent implements OnInit {
	movieData ;

  constructor(private httpClient:HttpClient, public activatedroute:ActivatedRoute){
    let id = this.activatedroute.snapshot.paramMap.get('id');
    let url = 'https://www.omdbapi.com/?i=' + id +'&apikey=8d631ed2';
    this.httpClient.get(url).subscribe((data:any [])=>{
        this.movieData = data;
        console.log(this.movieData);
      })
    

   }

  ngOnInit() {
  }

}
