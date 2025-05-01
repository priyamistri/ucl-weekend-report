import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,       // ✅ Add this!
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  public userData: any = {};
  public currentDate: string = '';
  public showThursdayMessage: boolean = false;

  ngOnInit(): void {
    this.currentDate= '';
    const stored = localStorage.getItem('userData');
    this.userData = stored ? JSON.parse(stored) : { fullName: 'Guest' };

    const dateObj = new Date();
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    this.currentDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    this.showThursdayMessage = (dayName === 'Thursday');
  }
}
