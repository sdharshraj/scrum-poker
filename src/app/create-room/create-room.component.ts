import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  creatingRoom: boolean = false;
  @ViewChild('roomForm', { static: false })
  roomForm: NgForm | undefined;
  constructor(private scrumpokerService: ScrumpokerService, private router: Router) {}

  createRoom() {
    if (this.roomForm?.valid) {
      this.creatingRoom = true;
      this.scrumpokerService.createRoom(this.roomName, this.userName).subscribe((room: Room) => {
        this.roomId = room.id;
        this.scrumpokerService.adminId = room.adminId;
        this.creatingRoom = false;
        this.router.navigate([`/room/${room.id}`]);
      });
    }
  }
}
