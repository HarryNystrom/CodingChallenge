import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root' 
})
export class CustomerService {

  baseUrl: string = 'https://localhost:3000/api/customer';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Customer[]> {
    const headers = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Access-Control-Allow-Origin', '*');
  
    return this.http.get<Customer[]>(this.baseUrl,{'headers':headers});
  }

  get(id: any): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  create(data: Customer): Observable<Customer> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post<Customer>(this.baseUrl, JSON.stringify(data), {'headers': headers });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
