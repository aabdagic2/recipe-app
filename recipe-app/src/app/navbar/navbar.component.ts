import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuItems = [
    { title: 'Home', link: '' },
    { title: 'Library', link: '/saved-recipes' },
    { title: 'My Diary', link: '/calories-today' }
  ];
}

