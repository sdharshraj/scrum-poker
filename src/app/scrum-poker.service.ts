import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, User } from './Model/Room';

@Injectable({
  providedIn: 'root'
})
export class ScrumpokerService {
  
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
    var room = encodeURI(roomName);
    return this.http.post<Room>(`${this.baseUrl}/Rooms`, body);
  }

  getRoom(roomId: string): Observable<Room>{
    return this.http.get<Room>(`${this.baseUrl}/Rooms/${roomId}`);
  }

  getRoomUsers(roomId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Rooms/users/${roomId}`);
  }
}
