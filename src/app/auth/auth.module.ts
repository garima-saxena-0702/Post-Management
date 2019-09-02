import { NgModule } from '@angular/core';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatDialogModule } from '@angular/material';

import { SignupComponent } from './signup/signupcomponent';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
