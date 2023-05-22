import { Component } from '@angular/core';
import { ScrumpokerService } from '../scrum-poker.service';
import { Router } from '@angular/router';
import { Room } from '../Model/Room';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {
  roomName: string = '';
  userName: string = '';
  roomId: string = '';

  constructor(private scrumpokerService: ScrumpokerService, private router: Router) {}

  createRoom() {
    console.log("rooma name: " + this.roomName + "user name " +  this.userName);
    this.scrumpokerService.createRoom(this.roomName, this.userName).subscribe((room: Room) => {
      this.roomId = room.id;
      this.scrumpokerService.adminId = room.adminId;
      this.router.navigate([`/room/${room.id}`]);
    });
  }
}
