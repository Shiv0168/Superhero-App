import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuperHero } from './Model/SuperHero';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseUrl:string = "http://localhost:3000/superHero";

  constructor(private httpClient:HttpClient) { }

  create(superHero:SuperHero){
    return this.httpClient.post<SuperHero>(`${this.baseUrl}` , superHero);
  }

  // getAll(search:string){
  //   return this.httpClient.get<SuperHero[]>(`${this.baseUrl}?q=${search}`);
  // }

  getAll(sortColumn:string , order:string , searchKey:string , currentPage:number , pageSize:number){
    let url = `http://localhost:3000/superHero?_page=${currentPage}&_limit=${pageSize}`;
    if(sortColumn && order){
      url = `${url}&_sort=${sortColumn}&_order=${order}`;
    }
    if(searchKey){
      url = `${url}&q=${searchKey}`; 
    }
    return this.httpClient.get<HttpResponse<any>>(url , {observe:'response'});
  }

  getById(id:number){
    return this.httpClient.get<SuperHero>(`${this.baseUrl}/${id}`);
  }

  update(superHero:SuperHero , id:number){
    return this.httpClient.put<SuperHero>(`${this.baseUrl}/${id}` , superHero);
  }

  delete(id:number){
    return this.httpClient.delete<SuperHero>(`${this.baseUrl}/${id}`);
  }
}
