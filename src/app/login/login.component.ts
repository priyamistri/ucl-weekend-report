import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private router: Router) {} 
  onSubmit() {
    this.router.navigate(['/dashboard']);
    // if (!this.username || !this.password) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Missing Fields!',
    //     text: 'Please fill in both username and password.',
    //     confirmButtonColor: '#811331'
    //   });
    //   return;
    // }

    // // Example login validation (replace with API call later)
    // if (this.username === 'admin' && this.password === 'admin123') {
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Login Successful!',
    //     text: 'Welcome to UCL REPORT system!',
    //     confirmButtonColor: '#FFC107',
    //     background: '#ffffff',
    //     color: '#811331'
    //   }).then(() => {
    //     this.router.navigate(['/dashboard']);
    //   });
    // } else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Login Failed!',
    //     text: 'Invalid username or password.',
    //     confirmButtonColor: '#811331',
    //     background: '#ffffff',
    //     color: '#811331'
    //   });
    // }
  }
}
