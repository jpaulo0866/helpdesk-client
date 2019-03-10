import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  shared: SharedService;
  constructor() {
    this.shared = SharedService.getInstance();
    this.shared.user = new User('', '', '', '');
  }

  ngOnInit() {
  }

  logout() {
    this.shared.token = null;
    this.shared.user = null;
    window.location.href = '/login';
    window.location.reload();
  }

}
