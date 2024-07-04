import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.form.invalid) {
      Swal.fire("Error", "Please enter all the fields correctly", "error");
      return;
    }

    const user = this.form.getRawValue();

    this.http.post<{ message: string, token: string }>('http://localhost:3000/auth/login', user)
    .subscribe({
      next: (response) => {
        console.log('oturum açıldı.');
        localStorage.setItem('token', response.token);  // Store token in local storage
        this.router.navigate(['/']);  // Redirect to home page after successful login
      },
      error: (err) => Swal.fire("Error", err.error.message, "error")
    });
  
  }
}
