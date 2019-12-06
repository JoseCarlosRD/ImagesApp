import { Component, OnInit } from '@angular/core';
import { FiltrarServices } from 'src/app/shared/filtrar.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-verimagenes',
  templateUrl: './verimagenes.component.html',
  styleUrls: ['./verimagenes.component.css']
})
export class VerimagenesComponent implements OnInit {

  
  imageList: any[];
  rowIndexArray: any[];

  constructor(private service: FiltrarServices,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.service.getImageDetailList(id)
    this.service.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => { return item.payload.val(); });
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
      }
    );
  }

}
