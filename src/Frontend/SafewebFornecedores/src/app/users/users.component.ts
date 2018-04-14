import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { Usuario } from '../shared/models/usuario';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  usuarios: Usuario[];
  ngOnInit() {
    this.usersService.getAll()
      .subscribe(usuarios => {
        this.usuarios = usuarios;
      });
  }

}
