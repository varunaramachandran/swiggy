import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './componentes/sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './componentes/login/login.component';
import { AuthComponent } from './auth.component';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
];

@NgModule({
  declarations: [SignUpComponent, LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 5000,
      preventDuplicates: true,
    }),
  ],
})
export class AuthModule {}
