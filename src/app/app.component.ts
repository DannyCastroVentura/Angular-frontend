import { Component } from '@angular/core';
import { MessageService } from './message.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hall of Heroes';

  constructor(public messageService: MessageService){ }

}
