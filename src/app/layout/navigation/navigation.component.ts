import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import {
  faUsers,
  faBook,
  faReceipt,
  faBookOpenReader,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from './navigation.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Prevent drawer resizing by setting its width dynamically
    const drawerWidth = 200; // Set the desired width for the drawer
    const drawer = document.querySelector('.example-sidenav') as HTMLElement;
    if (drawer) {
      drawer.style.width = `${drawerWidth}px`;
    }
  }
  @ViewChild(MatDrawer) drawer!: MatDrawer;
  showFiller = false;

  constructor(public ns: NavigationService, private router: Router) {}

  navigationList: any;
  ngOnInit(): void {
    this.getNavigation();
  }

  getNavigation() {
    let json = {};
    this.ns.getNavigation(json).subscribe((res) => {
      if (res) {
        this.navigationList = res;
      }
    });
  }

  dashboard() {
    this.router.navigate(['navigation', 'dashboard']);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  getIcon(iconName: string): any {
    switch (iconName) {
      case 'faUsers':
        return faUsers;
      case 'faBook':
        return faBook;
      case 'faReceipt':
        return faReceipt;
      case 'faBookOpenReader':
        return faBookOpenReader;
      case 'faUserPlus':
        return faUserPlus;
      default:
        return null;
    }
  }
}
