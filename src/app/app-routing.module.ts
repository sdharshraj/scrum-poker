import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { AppComponent } from './app.component';
import { CreateRoomComponent } from './create-room/create-room.component';

const routes: Routes = [
  { path: '', component: CreateRoomComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'create-room', component: CreateRoomComponent },
  // Wildcard route for navigation fallback
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
