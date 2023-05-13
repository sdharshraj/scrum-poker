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
  currentStory: string = '';
  cards: string[] = ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '?'];
  currentUser : User | undefined;
  constructor(private route: ActivatedRoute, private scrumPokerService: ScrumpokerService) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');
    if(this.roomId){
      this.scrumPokerService.getRoom(this.roomId).subscribe((room: Room) => {
        this.room = room;
        this.votes = this.room.votes;
        this.isCreator = this.room.id == this.scrumPokerService.admin?.roomId;
        this.welcomeMessage = `Welcome, ${this.room.createdBy.name}`;
      });

      this.scrumPokerService.getRoomUsers(this.roomId).subscribe((users: User[]) => {
        this.users = users;
      });
    }
  }
  joinRoom(): void {
    if(this.userName){
      this.scrumPokerService.addUserToRoom(this.roomId, this.userName).subscribe((user : User) => {
        console.log("logdfsfds", user);
        this.currentUser = user;
      });
    }
  }
  vote(card: string): void {
    console.log(card);
    this.scrumPokerService.vote(card);
  }
}
