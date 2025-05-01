import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgbModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    // console.log(this.userForm.value);
    const userData = this.userForm.value;
  
    // Email Validation
    if (!userData.email || !userData.email.includes('@asu.edu')) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Invalid ASU Email'
      });
      this.userForm.reset();
      return;
    }
  
    // Username Numeric Validation
    if (!/^\d+$/.test(userData.username)) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Username must be numeric only.'
      });
      this.userForm.reset();
      return;
    }
  
    // If validations pass, send to backend
    this.http.post('http://localhost:5000/api/users/register', userData)
      .subscribe({
        next: (res: any) => {
          // console.log(res);
          if (res[0]["Success"] == "0") {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: res[0].message
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: res[0].message
            });
            this.router.navigate(['/userlist']);
          }
          this.userForm.reset();

        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err
          });
        }
      });
  }
  

}
