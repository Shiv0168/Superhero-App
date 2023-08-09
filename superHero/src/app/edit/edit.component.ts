import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  addSuperHero:any;

  constructor(private apiService:ApiServiceService , private router:Router , private fb:FormBuilder , private activatedRoute:ActivatedRoute) {
    this.addSuperHero = this.fb.group({
      name : [""],
      imageUrl : [""],
      franchise:[""],
      gender:[""]
    })
  }
  ngOnInit(): void {
    this.apiService.getById(this.activatedRoute.snapshot.params["id"]).subscribe({
      next:(data)=>{
        this.addSuperHero = this.fb.group({
          name : [data.name],
          imageUrl : [data.imageUrl],
          franchise:[data.franchise],
          gender:[data.gender]
        })
      }
    })
  }
  
  submitForm(){
    this.apiService.update(this.addSuperHero.value , this.activatedRoute.snapshot.params["id"]).subscribe({
      next:(data)=>{
        this.addSuperHero.reset();
        this.router.navigate(["/"]);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
