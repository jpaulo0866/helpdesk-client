import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  shared: SharedService;

  constructor() {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

}
