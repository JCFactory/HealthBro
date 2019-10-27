import { CommonService } from './../services/common.service';
import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'HealthBro';
  speech_bubble = 'Check your health, Bro!';

  messages: any[];
  Repdata;
  valButton = 'Save';
  errorMessage;

  constructor(private newService: CommonService) {
  }

  ngOnInit() {
    this.newService.getMessages().subscribed(data => this.Repdata = data);
  }

  sendMessage(message) {
    this.newService.saveMessage(message).subscribe(data => {
      alert(data.data);
      this.ngOnInit();
    },
      error => this.errorMessage = error);

    // const files = !event.files ? [] : event.files.map((file) => {
    //   return {
    //     url: file.src,
    //     type: file.type,
    //     icon: 'file-text-outline',
    //   };
    // });

    // this.messages.push({
    //   text: event.message,
    //   date: new Date(),
    //   reply: true,
    //   type: files.length ? 'file' : 'text',
    //   files: files,
    //   user: {
    //     name: 'Jonh Doe',
    //     avatar: 'https://i.gifer.com/no.gif',
    //   },
    // });
    // // const botReply = this.chatShowcaseService.reply(event.message);
    // // if (botReply) {
    // //   setTimeout(() => { this.messages.push(botReply) }, 500);
    // // }
  }

  deleteMessage(id) {
    this.newService.deleteMessage(id).subscribe(data => { alert(data.data); this.ngOnInit(); }, error => this.errorMessage = error);
  }

  headClicked() {
    console.log('head');
  }
}
