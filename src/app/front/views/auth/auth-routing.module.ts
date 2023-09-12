import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            active: 'login'
        },
        pathMatch: 'full'
    },
    {
        path: 'logout',
        component: LogoutComponent,
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: SignupComponent,
        data: {
            active: 'register'
        },
        pathMatch: 'full'
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
