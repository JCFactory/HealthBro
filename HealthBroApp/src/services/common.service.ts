import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/Rx';

@Injectable()
export class CommonService {
  constructor(private http: Http) { }

  saveMessage(message) {
    return this.http.post('http://localhost:8080/api/saveMessage', message).map((response: Response) => response.json());
  }

  getMessages() {
    return this.http.post('http://localhost:8080/api/getMessages').map((response: Response) => response.json());
  }

  deleteMessage(id) {
    return this.http.post('http://localhost:8080/api/deleteMessage', { 'id': id }).map((response: Response) => response.json());
  }

}
