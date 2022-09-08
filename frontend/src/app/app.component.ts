import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  rawUsersData: User[] = [];
  users: User[] = [];
  searchName = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  onSearchChanges(event: any) {
    this.users = this.rawUsersData.filter((user) => {
      return user.name.toLowerCase().includes(this.searchName.toLowerCase());
    });
  }

  onResetBalance(event: any) {
    this.users = this.rawUsersData
      .map((user) => {
        user.balanceNum = 0;
        return user;
      })
      .filter((user) => {
        return user.name.toLowerCase().includes(this.searchName.toLowerCase());
      });
  }

  loadUsers() {
    return this.http.get<User[]>('/assets/users.json').subscribe((users) => {
      users.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      this.rawUsersData = users.map((user) => {
        user.registered = user.registered.replace(/ /g, '');
        user.balanceNum = parseFloat(user.balance.replace(/[^0-9\.]+/g, ''));
        return user;
      });
      this.users = this.rawUsersData;
    });
  }
}
