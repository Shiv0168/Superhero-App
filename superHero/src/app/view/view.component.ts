import { Component, OnInit } from '@angular/core';
import { SuperHero } from '../Model/SuperHero';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  allSuperHeroes: SuperHero[] = [];
  sortingControl = new FormControl(''); 
  searchControl = new FormControl(''); 
  pageIndex:number = 0;
  pageSize:number = 10;
  totalRecords:number = 0;

  // searchForm:FormGroup = new FormGroup({
  //   search: new FormControl('')
  // })

  constructor(private apiService: ApiServiceService, private router: Router) {}
  ngOnInit(): void {
    this.getAllApi('' , '' , '');
    this.sortingControl.valueChanges.subscribe((value)=>{
      if(value){
        this.pageIndex = 0;
        this.pageSize = 10;
        let sortData = this.doSorting(value);
        this.getAllApi(sortData.sortColumn , sortData.order , (this.searchControl.value ?? ''));
      }
    })
  }

  //   this.searchForm.get('search')?.valueChanges.pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     switchMap((v)=> this.apiService.getAll(v)),
  //   ).subscribe((v)=>{
  //     this.allSuperHeroes = v;
  //   })
  // }

  doSorting(value:string){
    let sortColumn:string  = "";
    let order:string = "";

    if(value === "id-by-asc"){
      sortColumn = "id";
      order = "asc";
    }else if (value === "id-by-desc"){
      sortColumn = "id";
      order = "desc";
    } else if(value === "franchise-by-asc"){
      sortColumn = "frachise";
      order = "asc";
    }else if (value === "franchise-by-desc"){
      sortColumn = "franchise";
      order = "desc";
    }else if(value === "gender-by-asc"){
      sortColumn = "gender";
      order = "asc";
    }else if (value === "gender-by-desc"){
      sortColumn = "gender";
      order = "desc";
    }
    return {
      sortColumn,
      order
    }
  }

  textSearch(){
    this.pageIndex = 0;
    this.pageSize = 10;
    let sortData = this.doSorting(this.sortingControl.value ?? "");
    this.getAllApi(sortData.sortColumn , sortData.order , (this.searchControl.value ?? " "))
  }

  onPrevious(){
    this.pageIndex --;
    let sortData = this.doSorting(this.sortingControl.value ?? "");
    this.getAllApi(sortData.sortColumn , sortData.order , (this.searchControl.value ?? " "))
  }

  onNext(){
    this.pageIndex ++;
    let sortData = this.doSorting(this.sortingControl.value ?? "");
    this.getAllApi(sortData.sortColumn , sortData.order , (this.searchControl.value ?? " "))
  }

  filterCandidate(){
    let sortData = this.doSorting(this.sortingControl.value ?? "");
    this.getAllApi(sortData.sortColumn , sortData.order , (this.searchControl.value ?? " "))
  }

  getAllApi(sortColumn:string , order:string , searchKey:string){
    this.apiService.getAll(sortColumn , order , searchKey , (this.pageIndex+1) , this.pageSize).subscribe({
      next: (data) => {
        this.allSuperHeroes = data.body as unknown as SuperHero[];
        this.totalRecords = data.headers.get('X-Total-Count') ? Number(data.headers.get('X-Total-Count')) : 0; 
      }
    });
  }

  delete(id: number) {
    this.apiService.delete(id).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
    });
  }
}
