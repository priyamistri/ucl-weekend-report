import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2
@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, RouterModule, FormsModule],
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }
  users: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  fullName = '';
  userData: any

  ngOnInit() {
    this.Get_All_USER();
    const stored = localStorage.getItem('userData');
    this.userData = stored ? JSON.parse(stored) : { fullName: 'Guest' };
    // console.log("userdata", this.userData);
  }
  Get_All_USER() {
    this.http.post('http://localhost:5000/api/users/Get_All_Users', "")
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
            this.users = res[0].users;
          }
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
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.users.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  onEdit(user: any) {
    // console.log('Edit clicked for:', user);
  }

  onDelete(user: any) {
    // console.log('Delete clicked for:', user);
  }
  onApprove(user: any) {
    if (user.username == this.userData.username) {
      Swal.fire({
        icon: 'error',
        title: 'Alert',
        text: "You can change your own status!"
      });
    } else {
      var status = user.status
      if (user.status == "1") {
        status = "0"
      }
      const userData = {
        username: user.username,
        status: "1" // or "0"
      };
      // console.log(userData)
      this.http.post('http://localhost:5000/api/users/Update_User_Status', userData)
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
              this.Get_All_USER();
            }
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
  onNotApprove(user: any) {
    if (user.username == this.userData.username) {
      Swal.fire({
        icon: 'error',
        title: 'Alert',
        text: "You can change your own status!"
      });
    } else {
      // console.log(user);
      var status = user.status
      if (user.status == "0") {
        status = "0"
      }
      const userData = {
        username: user.username,
        status: "0" // or "0"
      };
      // console.log(userData)
      this.http.post('http://localhost:5000/api/users/Update_User_Status', userData)
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
              this.Get_All_USER();
            }
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
  AddNewUser() {
    // console.log('New User:', this.fullName);
    this.router.navigate(['/Admin']);
  }


}
