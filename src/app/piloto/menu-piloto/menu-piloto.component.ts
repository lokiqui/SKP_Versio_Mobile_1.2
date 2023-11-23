import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-piloto',
  templateUrl: './menu-piloto.component.html',
  styleUrls: ['./menu-piloto.component.scss']
})
export class MenuPilotoComponent implements OnInit {

  email:string = '';

  constructor(
    private router: Router,
    private authService:AuthService) {
      this.authService.getAuthState().subscribe(
        (usuario) => {
          if (usuario && usuario.email) {
              this.email = usuario.email;
          }
        }
      );
  }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.SignOut();
    
    this.router.navigateByUrl('');
  }
}
