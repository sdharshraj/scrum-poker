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
  roomName: string = "No room defined.";
  userName: string = '';

  constructor(private scrumpokerService: ScrumpokerService, private router: Router) {}

  createRoom() {
    this.scrumpokerService.createRoom(this.roomName, this.userName).subscribe((response: Room) => {
      console.log(response);
      this.router.navigate(['/room',response.id]);
    });
  }
}
