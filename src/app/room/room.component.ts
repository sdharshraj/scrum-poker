import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrumpokerService } from '../scrum-poker.service';
import { Room, User, Vote } from '../Model/Room';
import * as signalR from "@microsoft/signalr";

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
  isCreator = false;
  selectedCard: number = -1;
  currentStory: string = '';
  cards: string[] = ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '?'];
  currentUser: User | undefined;
  private hubConnection: signalR.HubConnection | undefined;
  notificationMessage: string = '';

  constructor(private route: ActivatedRoute, private scrumPokerService: ScrumpokerService) {
    // Create a new SignalR connection
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7054/roomhub")
      .build();
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');

    if (this.hubConnection) {
      // Start the SignalR connection
      this.hubConnection.start().then(() => {
        console.log("SignalR connection established.");

        this.hubConnection?.invoke('joinGroup', this.roomId).then(() => {
          console.log(`Joined group ${this.roomId}`);
        }).catch((err) => {
          console.error(`Error joining group ${this.roomId}: ${err}`);
        });

        // Register the UserJoined event handler
        this.hubConnection?.on("UserJoined", (username: string) => {
          if (username && this.roomId) {
            this.notificationMessage = `User ${username} is joined.`;
            this.scrumPokerService.getRoomUsers(this.roomId).subscribe((users: User[]) => {
              this.users = users;
            });
          }
        });

        this.hubConnection?.on("UserVoted", (vote: number) => {
          console.log("user voted ", vote);
          if (vote && this.roomId) {
            this.scrumPokerService.getRoom(this.roomId).subscribe((room: Room) => {
              this.room = room;
              console.log(" Room object : ",this.room);
              this.users = this.room.users;
              this.isCreator = this.room.id == this.scrumPokerService.admin?.roomId;
            });
          }
        });
      }).catch((err) => {
        console.error(`Error starting SignalR connection: ${err}`);
      });
    }

    if (this.roomId) {
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
    if (this.userName) {
      this.scrumPokerService.addUserToRoom(this.roomId, this.userName).subscribe((user: User) => {
        this.currentUser = user;
      });
    }
  }

  vote(card: string) {
    if (this.currentUser)
      this.scrumPokerService.UserVote(card, this.currentUser.id, this.currentUser.roomId);
  }
}


