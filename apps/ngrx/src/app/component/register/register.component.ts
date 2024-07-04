import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Bu kısım artık gerekli değil, çünkü form constructor içinde başlatılıyor
  }

  submit(): void {
    let user = this.form.getRawValue();
    console.log(user);
    
    if (this.form.invalid) {
      Swal.fire("Error", "Please enter all the fields correctly", "error");
      return;
    }

    this.http.post("http://localhost:3000/auth/register", user, {
      withCredentials: true
    })
    .subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => Swal.fire("Error", err.error.message, "error")
    });
  }
}