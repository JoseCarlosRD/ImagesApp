import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoriasServices {
  imageDetailList: AngularFireList<any>;
  constructor(private firebase:AngularFireDatabase) {
    this.getImageDetailList()
   }
  
  getImageDetailList() {
    this.imageDetailList = this.firebase.list('categorias');
  }
  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }
}