import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private router: Router, private http: HttpClient) { }
  onSubmit() {
    if(this.username == undefined || this.username == "" || this.password == undefined || this.password == "")
    {
    
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields!',
        text: 'Please fill in both username and password.',
        confirmButtonColor: '#811331'
      });
      return;
    }else{
      const userData = {
        username: this.username,
        password: this.password
      };
      // console.log(this.username, this.password)
      this.http.post('http://localhost:5000/api/users/Login', userData)
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
              const UserData = res[0].user;
              // // console.log(UserData);
              localStorage.setItem('userData', JSON.stringify(UserData));
  
              // ✅ Optional: mark login status
              localStorage.setItem('isLoggedIn', 'true');
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: res[0].message
              });
  
              this.router.navigate(['/dashboard']);
            }
            this.username = "";
            this.password = "";
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
