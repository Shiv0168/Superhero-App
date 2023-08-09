import { Component, OnInit } from '@angular/core';
import { SuperHero } from '../Model/SuperHero';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {

  addSuperHero:any;

  constructor(private apiService:ApiServiceService , private router:Router , private fb:FormBuilder) {
    this.addSuperHero = this.fb.group({
      name : [""],
      imageUrl : [""],
      franchise:[""],
      gender:[""]
    })
  }
  ngOnInit(): void {}
  
  submitForm(){
    this.apiService.create(this.addSuperHero.value).subscribe({
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
