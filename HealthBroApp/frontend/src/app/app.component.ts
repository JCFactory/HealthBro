import { CommonService } from './../services/common.service';
import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title = 'HealthBro';
  public speech_bubble = 'Check your health, Bro!';

  public messages: any[];
  public Repdata;
  public errorMessage;

  constructor(private newService: CommonService) {
  }

}
