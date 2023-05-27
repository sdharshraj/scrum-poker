import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrumpokerService } from '../scrum-poker.service';
import { Room, User, Vote } from '../Model/Room';
import * as signalR from "@microsoft/signalr";
import { MatSnackBar } from '@angular/material/snack-bar';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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
  private eventUrl = environment.eventUrl;
  inviteLink: string | undefined;
  showVote: boolean = false;
  currentAdmin: User | undefined;

  constructor(private route: ActivatedRoute, 
    private scrumPokerService: ScrumpokerService,
    private snackBar: MatSnackBar,
    private router: Router) {
    // Create a new SignalR connection
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.eventUrl}/roomhub`)
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
            this.showNotification(`${username} joined the Room.`);
            this.scrumPokerService.getRoomUsers(this.roomId).subscribe((users: User[]) => {
              this.users = users;
            });
          }
        });

        this.hubConnection?.on("UserRemoved", (username: string) => {
          if (username && this.roomId) {
            this.showNotification(`${username} left the Room.`);
            this.scrumPokerService.getRoomUsers(this.roomId).subscribe((users: User[]) => {
              this.users = users;
            });
          }
        });

        this.hubConnection?.on("UserVoted", (vote: number) => {
          if (vote && this.roomId) {
            this.scrumPokerService.getRoom(this.roomId).subscribe((room: Room) => {
              this.room = room;
              this.users = this.room.users;
              this.isCreator = this.room.adminId == this.scrumPokerService.adminId;
            });
          }
        });

        this.hubConnection?.on("VoteCleared", (roomId: string) => {
          this.showNotification(`All user votes cleared.`);
          if (this.roomId) {
            this.scrumPokerService.getRoom(this.roomId).subscribe((room: Room) => {
              this.room = room;
              this.users = this.room.users;
              this.isCreator = this.room.adminId == this.scrumPokerService.adminId;
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
        this.isCreator = this.room.adminId == this.scrumPokerService.adminId;
        this.currentAdmin = room.users[0]
        this.hubConnection?.invoke('UpdateJoinedUsername', this.room.createdBy, this.roomId);
      },
      (error: any) => {
        // Handle the error here
        // Redirect to the home page or perform any other desired action
        console.error('Error getting room:', error);
        // Redirect to home page
        this.router.navigate(['/']);
      }
    );

      this.scrumPokerService.getRoomUsers(this.roomId).subscribe((users: User[]) => {
        this.users = users;
      });
      this.setInviteLink();
    }
  }
  joinRoom(): void {
    if (this.userName) {
      this.scrumPokerService.addUserToRoom(this.roomId, this.userName).subscribe(
        (user: User) => {
          this.currentUser = user;
          this.scrumPokerService.currentUser = user;
          this.welcomeMessage = `Welcome, ${this.scrumPokerService.currentUser?.name}`;
          this.hubConnection?.invoke('UpdateJoinedUsername', this.userName, this.roomId);
        },
        (error: any) => {
          if (error && error.status === 409) {
            console.log("Conflict: User already exists in the room.", error);
            this.showNotification(`${this.userName} already exists in the room. Please select a different name.`);
          } else {
            console.error("An error occurred while joining the room.", error);
          }
        }
      );
    }
  }
  
  

  vote(card: string) {
    if (this.currentUser)
      this.scrumPokerService.UserVote(card, this.currentUser.id, this.currentUser.roomId);
  }

  voteAdmin(card: string) {
    if (this.currentAdmin)
      this.scrumPokerService.UserVote(card, this.currentAdmin.id, this.currentAdmin.roomId);
  }

  clearVote(){
    if(this.currentAdmin)
      this.scrumPokerService.ClearVote(this.currentAdmin.roomId);
  }

  showNotification(message: string): void {
    const snackBarRef = this.snackBar.open(message, 'Dismiss', {
      duration: 1500, 
      panelClass: 'custom-snackbar', 
    });
  
    // Automatically dismiss the snackbar after 2 seconds
    timer(1500)
      .pipe(take(1))
      .subscribe(() => snackBarRef.dismiss());
  }
  
  onCopySuccess() {
    this.showNotification('Invite link copied.');
  }  

  setInviteLink() {
    this.inviteLink =  `http://localhost:4200/room/${this.roomId}`;
  }  

  toggleVoteVisibility() {
    this.showVote = !this.showVote;
  }

  navigateToHome(){
    this.router.navigate(['/']);
  }
}


