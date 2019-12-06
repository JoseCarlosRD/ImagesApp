import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagesComponent } from './images/images.component';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { BlogComponent } from './blog/blog.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { VerimagenesComponent } from './verimagenes/verimagenes.component';


const routes: Routes = [

  {path:'',redirectTo:'image/upload',pathMatch: 'full'},
  
  {path: 'image',component:ImagesComponent,children:[
    {path:'upload',component:ImageComponent},
    {path:'tutorial',component:TutorialComponent},
  {path:'blog',component:BlogComponent},
  {path:'gameplay',component:GameplayComponent},
    {path:'list',component:ImageListComponent},
    {path:'ver/:id',component:VerimagenesComponent},
  ]}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
