import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  @Input() passingData:any [];
  @Input() passVar;
  data = JSON.stringify(this.passingData);
title:string = '';
img:any;
  constructor() { 
  	console.log('working/.....')
  	console.log(this.passVar)
  }

  ngOnInit() {	
  	//this.fun(this.data);  		

  }

  fun(){

  // this.title = this.passingData.Title;
  // this.img = this.passingData.Poster;

  
  // lang = this.passingData.Language;
  // imdbRating = this.passingData.imdbRating;
  // actors = this.passingData.Actors;
// console.log(data);
	console.log(this.passingData);
  }

}
