import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrumpokerService } from '../scrum-poker.service';
import { Room, User, Vote } from '../Model/Room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  room: Room | undefined;
  welcomeMessage: string | undefined;
  roomId: string | null | undefined;
  userName: string | undefined;
  votes: Vote[] | undefined;
  users: User[] | undefined;
  userVote: string | undefined;
  isCreator = false;
  selectedCard: number = -1;

  constructor(private route: ActivatedRoute, private scrumPokerService: ScrumpokerService) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');
    if(this.roomId){
      this.scrumPokerService.getRoom(this.roomId).subscribe((room: Room) => {
        this.room = room;
        this.votes = this.room.votes;
        this.isCreator = this.roomId === this.room.createdBy.roomId;
        this.welcomeMessage = `Welcome, ${this.room.createdBy.name}`;
      });

      this.scrumPokerService.getRoomUsers(this.roomId).subscribe((users: User[]) => {
        this.users = users;
      });
    }
  }
}
