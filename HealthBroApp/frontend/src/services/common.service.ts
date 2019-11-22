import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Injectable()
export class CommonService {
  constructor(private http: Http) { }

  saveMessage(message) {
    return this.http.post('http://localhost:8080/api/saveMessage', message).pipe(map((response: any) => response.json()));
  }

  getMessages() {
    return this.http.get('http://localhost:8080/api/getMessages').pipe(map((response: any) => response.json()));
  }

  deleteMessage(id) {
    return this.http.post('http://localhost:8080/api/deleteMessage', { 'id': id }).pipe(map((response: any) => response.json()));
  }

}
