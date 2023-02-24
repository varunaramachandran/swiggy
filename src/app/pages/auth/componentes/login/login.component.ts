import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../../model/auth.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  LoginForm!: FormGroup;
  loginUpData: any;
  users: Users[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.LoginForm = this.fb.group({
      phone: [
        this.loginUpData?.phone ? this.loginUpData.phone : '',
        Validators.required,
      ],
    });
  }

  get formControls() {
    return this.LoginForm?.controls;
  }

  onSubmit() {
    if (this.LoginForm.invalid) {
      this.LoginForm.markAllAsTouched();
      return;
    }
    console.log('val', this.LoginForm.value);
    this.authService.getUsers().subscribe({
      next: (res: Users[]) => {
        if (res) {
          this.users = res;
          let result = this.users.find((item: any) => {
            return item.phone == this.LoginForm.value.phone;
          });
          if (result) {
            localStorage.setItem('isLoggedIn', 'true');
            this.toaster.success('Successfully logged In');
            this.router.navigate(['/restaurants']);
          } else {
            localStorage.removeItem('isLoggedIn');
            this.toaster.error('No account found, Please signup');
          }
        }
      },
      error: (err) => {
        this.toaster.error('No account found');
      },
    });
  }
}
