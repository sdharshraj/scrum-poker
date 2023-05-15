import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrumpokerService } from './scrum-poker.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddMemberComponent } from './add-member/add-member.component';
import { RoomComponent } from './room/room.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { ScrumVoteCardComponent } from './scrum-vote-card/scrum-vote-card.component';
import { ClipboardModule } from 'ngx-clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    AddMemberComponent,
    RoomComponent,
    CreateRoomComponent,
    ScrumVoteCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    NoopAnimationsModule,
    ClipboardModule,
    MatSnackBarModule
  ],
  providers: [ScrumpokerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
