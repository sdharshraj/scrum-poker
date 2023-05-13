import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scrum-vote-card',
  templateUrl: './scrum-vote-card.component.html',
  styleUrls: ['./scrum-vote-card.component.css']
})
export class ScrumVoteCardComponent {
selectCard() {
throw new Error('Method not implemented.');
}
  @Input() value: string | undefined;
  @Input() selected: boolean | undefined;
  
  // ... rest of the component code
}
