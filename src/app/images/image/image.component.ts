import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { ImageService } from 'src/app/shared/image.service';
import { CategoriasServices } from 'src/app/shared/categorias.service';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: []
})
export class ImageComponent implements OnInit {
  imgSrc : string = '/assets/img/home.jpg';
  imgSrc2 : string = '/assets/img/home.jpg';
  selectedImage: any = null;
  selectedImage2: any = null;
  isSubmitted:boolean;
  imageList: any[];
  imageList2: any[];
  rowIndexArray: any[];
  isSubmitted2:boolean;
  formTemplate = new FormGroup({
    titulo : new FormControl('',Validators.required),
    category : new FormControl(''),
    imageUrl : new FormControl('',Validators.required),
    codigo : new FormControl('',Validators.required),
    youtube : new FormControl('',Validators.required)
  })

  form2Template = new FormGroup({
    imageUrl : new FormControl('',Validators.required),
    titulo : new FormControl('',Validators.required),
    detalles : new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
  })

  constructor(private storage:AngularFireStorage,private service:ImageService
    ,private cate:CategoriasServices) { }

  ngOnInit() {
    this.resetForm();
    this.resetForm2();
    this.vercategorias()
  }

  showPreview(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = '/assets/img/home.jpg';
      this.selectedImage = null;
    }
  }

  showPreview2(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc2 = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage2 = event.target.files[0];
    }
    else{
      this.imgSrc2 = '/assets/img/home.jpg';
      this.selectedImage2 = null;
    }
  }
  onSubmit(formValue){
    this.isSubmitted = true;
    if(this.formTemplate.valid){
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            formValue['imageUrl']=url;
            this.service.insertImageDetails(formValue);
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }
  
  onSubmit2(form2Value){
    this.isSubmitted2 = true;
    if(this.form2Template.valid){
      var filePath = `${form2Value.direccion}/${this.selectedImage2.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage2).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            form2Value['imageUrl']=url;
            this.cate.insertImageDetails(form2Value);
            this.resetForm2();
          })
        })
      ).subscribe();
      
      
      }
    }
    get form2Controls(){
    return this.form2Template['controls'];
  }
  get formControls(){
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      titulo: '',
      imageUrl: '',
      codigo: '',
      youtube: '',
      category: ''
    });
    this.imgSrc = '/assets/img/home.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }
  resetForm2() {
    this.form2Template.reset();
    this.form2Template.setValue({
      titulo: '',
      detalles: '',
      imageUrl: '',
      direccion: '',
    });
    this.isSubmitted2 = false;
    this.imgSrc2 = '/assets/img/home.jpg';
    this.selectedImage2 = null;
  }
  vercategorias(){
    this.cate.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => { return item.payload.val(); });
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        console.log( this.rowIndexArray)
      }
    );
  }
}
