import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/models/usuario';
import { UsersService } from '../../shared/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  usuario: Usuario;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.usersService.get(this.route.snapshot.params['id'])
      .subscribe(usuario => {
        this.usuario = usuario        
      });
  }

  excluir() {
    this.usersService.delete(this.usuario.Id)
      .subscribe(res => this.router.navigate(['/users']));
  }

}
