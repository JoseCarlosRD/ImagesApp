import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FiltrarServices {
  imageDetailList: AngularFireList<any>;
  constructor(private firebase:AngularFireDatabase) { }


  getImageDetailList(id) {
    this.imageDetailList = this.firebase.list('imageDetails',ref=>ref.orderByChild("category").equalTo(id));
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }

}