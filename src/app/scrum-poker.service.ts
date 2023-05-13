import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  createRoom(roomName: string): Observable<string> {
    var room = encodeURI(roomName);
    return this.http.post<string>(`${this.baseUrl}/Rooms?roomName=${room}`, { name: roomName });
  }
}
