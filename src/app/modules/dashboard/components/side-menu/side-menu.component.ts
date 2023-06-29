import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Authorities } from 'src/app/guards/authorities';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  hasPermissonBank: boolean = false;

  constructor(private router: Router, private authorities: Authorities) {
    this.hasPermissonBank = this.hasPermission('ROLE_BANCO_LST');
  }
  
  selectedMenu(pathCompare: string): boolean {
    const path = this.router.url;
    return pathCompare === path;
  }

  hasPermission(role: string): boolean {
    return !this.authorities.hasPermission(role);
  }
}
