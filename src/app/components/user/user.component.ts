import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  constructor() { }
  @Input()
  user!: UserModel;

  ngOnInit(): void {
  }

}
