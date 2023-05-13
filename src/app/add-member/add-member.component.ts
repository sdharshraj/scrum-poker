import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrumpokerService } from '../scrum-poker.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  roomId: string | null = '';
  memberName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scrumpokerService: ScrumpokerService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId');
    });
  }
}
