import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Authorities } from 'src/app/guards/authorities';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private router: Router, public authorities: Authorities) { }

  logoff(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/auth']);
  }
  
}
