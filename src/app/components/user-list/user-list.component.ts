import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'src/app/dialog.service';
import { Router } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  page = 0;
  count = 5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listUser: {};

  constructor(
    private dialogService: DialogService,
    private userService: UserService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      alert: true
    };

    this.classCss['alert-' + type] = true;
  }

  findAll(page: number, count: number) {
    this.userService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listUser = responseApi.data.content;
      this.pages = new Array(responseApi.data.totalPages);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.errors ? err.error.errors[0] : err.error.message
      });
    });
  }

  edit(id: string) {
    this.router.navigate(['/user-new', id]);
  }

  setNextPage(event) {
    event.preventDefault();
    if (this.page + 1 < this.pages.length) {
      this.page += 1;
      this.findAll(this.page, this.count);
    }
  }

  setPreviousPage(event) {
    event.preventDefault();
    if (this.page > 0) {
      this.page -= 1;
      this.findAll(this.page, this.count);
    }
  }

  setPage(i, event) {
    event.preventDefault();
    this.page = i;
    this.findAll(this.page, this.count);
  }

  delete(id: string) {
    this.dialogService.confirm('Do you really want to delete this record?').
    then((canDelete: boolean) => {
      if (canDelete) {
        this.message = {};
        this.userService.delete(id).subscribe((responseApi: ResponseApi) => {
          this.showMessage({
            type: 'success',
            text: 'Record sucessfully deleted'
          });
          this.findAll(this.page, this.count);
        }, err => {
          this.showMessage({
            type: 'error',
            text: err.error.errors ? err.error.errors[0] : err.error.message
          });
        });
      }
    });
  }
}
