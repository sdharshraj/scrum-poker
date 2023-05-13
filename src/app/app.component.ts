import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScrumpokerService } from './scrum-poker.service';
import { Room } from './Model/Room';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  roomId: string | null = null;
}
