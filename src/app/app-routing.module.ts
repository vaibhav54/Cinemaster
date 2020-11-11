import { NgModule,Input } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MovieinfoComponent } from './homepage/movieinfo/movieinfo.component';

const routes: Routes = [{
  path:'', component:HomepageComponent
},
{
  path:'signin', component:SigninComponent
},
{
	path:'movieinfo/:id', component:MovieinfoComponent	
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
