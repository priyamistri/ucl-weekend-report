import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgbModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,  private http: HttpClient) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    // if (this.userForm.valid) {
      const userData = this.userForm.value;
  
      this.http.post('http://localhost:5000/api/users/register', userData)
        .subscribe({
          next: (res) => {
            console.log('✅ User Registered:', res);
            alert('✅ User successfully registered!');
            this.userForm.reset();
          },
          error: (err) => {
            console.error('❌ Registration failed:', err);
            alert('❌ Failed to register user.');
          }
        });
  
    // } else {
    //   alert('❌ Please fill all fields correctly.');
    // }
  }
  
}
