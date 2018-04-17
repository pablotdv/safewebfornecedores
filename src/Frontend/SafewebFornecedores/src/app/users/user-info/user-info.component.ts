import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../shared/services/user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  usuario: string;

  constructor(private usersService: UsersService, private authService: AuthService, private router: Router,
    private userInfoService: UserInfoService) { }

  ngOnInit() {
    this.userInfoService.notifier
      .subscribe(res => {
        this.getUserInfo();
      });

    this.getUserInfo();
  }

  sair() {
    this.authService.logout()
      .subscribe(res => {
        if (!this.isLoggedIn) {
          this.router.navigate(['/account/login']);
        }
      });
  }

  getUserInfo() {
    if (this.isLoggedIn) {
      this.usersService.getUserInfo()
        .subscribe(res => {
          this.usuario = res.Email;
          console.log(this.usuario);
        });
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
