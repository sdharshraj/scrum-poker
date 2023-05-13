import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, User } from './Model/Room';

@Injectable({
  providedIn: 'root'
})
export class ScrumpokerService {
  
  currentUser : User | undefined;
  admin: User | undefined;
  private baseUrl = 'https://localhost:7054/api';

  constructor(private http: HttpClient) { }

  getCurrentStory(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/current-story`);
  }

  vote(card: string): void {
    this.http.post(`${this.baseUrl}/vote`, { card }).subscribe();
  }

  createRoom(roomName: string, userName: string): Observable<Room> {
    const body = {roomName, userName};
    return this.http.post<Room>(`${this.baseUrl}/Rooms`, body);
  }

  getRoom(roomId: string): Observable<Room>{
    return this.http.get<Room>(`${this.baseUrl}/Rooms/${roomId}`);
  }

  getRoomUsers(roomId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Rooms/users/${roomId}`);
  }

  addUserToRoom(roomId: string | null | undefined, userName: string): Observable<User> {
    const body = {userName, roomId };
    return this.http.post<User>(`${this.baseUrl}/Rooms/JoinRoom`, body);
  }
}
