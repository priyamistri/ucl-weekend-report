import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public userData: any = {};
  isMenuOpen = false;
  Role: any;
  ngOnInit(): void {
    const stored = localStorage.getItem('userData');
    this.userData = stored ? JSON.parse(stored) : { fullName: 'Guest' };
    this.Role = this.userData.role;
  }
}
