import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScrumpokerService } from './scrum-poker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  roomName: string = "No room defined.";

  constructor(private scrumpokerService: ScrumpokerService, private router: Router) {}

  createRoom() {
    this.scrumpokerService.createRoom(this.roomName).subscribe((roomId: string) => {
      console.log("this is a log ", roomId);
      this.router.navigate([`/room/${roomId}`]);
    });
  }
}
