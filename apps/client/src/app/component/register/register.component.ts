import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
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

  ngOnInit(): void {}

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
