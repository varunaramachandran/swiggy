import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Users } from '../../model/auth.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  toggleSidenav: boolean = false;
  signUpForm!: FormGroup;
  users: Users[] = [];
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  changeClass() {
    this.toggleSidenav = !this.toggleSidenav;
  }

  initializeForm() {
    this.signUpForm = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
      ],

      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.required],
    });
  }

  get formControls() {
    return this.signUpForm?.controls;
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    this.authService.getUsers().subscribe({
      next: (res: Users[]) => {
        if (res) {
          this.users = res;
          let result = this.users.find((item: any) => {
            return item.phone == this.signUpForm.value.phone;
          });
          if (result) {
            this.toaster.error('This user already exist');
          } else {
            this.authService.postSignUp(this.signUpForm.value).subscribe({
              next: (res) => {
                // this.router.navigate(['/restaurants']);
                this.newItemEvent.emit('showLogin');
              },
              error: (err) => {},
            });
          }
        }
      },
      error: (err) => {},
    });
  }
}
