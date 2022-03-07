import { Injectable } from '@angular/core';
import { MessagesComponent } from './messages/messages.component';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  messages: string[] = [];

  add(message: string) {
    const date = new Date;
    this.messages.push(message + " on " + date.toUTCString().replace(' GMT', ''));
  }

  clear() {
    this.messages = [];
  }

  constructor() { }
}
