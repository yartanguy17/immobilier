import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  baseUrl: string = environment.apiUrl;
  error = false;
  password = '';
  username = '';


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.http.post(`${this.baseUrl}get_token`,
      {
        username: this.username,
        password: this.password
      }).toPromise().then(
        (res: any) => {
          localStorage.setItem('currentUser', JSON.stringify({token: res.token}));
          this.router.navigate(['/']);
        },
        err => this.error = true
      ).catch(error => {
        this.error = true;
      });
  }

}
