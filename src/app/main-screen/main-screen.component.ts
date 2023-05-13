import { Component, OnInit } from '@angular/core';
import { ScrumpokerService } from '../scrum-poker.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  currentStory: string = '';
  cards: string[] = ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '?'];

  constructor(private scrumpokerService: ScrumpokerService) { }

  ngOnInit(): void {
    this.scrumpokerService.getCurrentStory().subscribe(currentStory => {
      this.currentStory = currentStory;
    });
  }

  vote(card: string): void {
    this.scrumpokerService.vote(card);
  }
}