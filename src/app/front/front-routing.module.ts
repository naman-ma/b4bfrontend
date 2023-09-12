import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './containers/default/default.component';
import { NonAuthGuard } from './guards/non-auth/non-auth.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { ResetPasswordComponent } from './views/auth/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'settings',
    loadChildren: () => import('./views/settings/settings.module').then(m => m.SettingsModule),
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
        // canActivate: [AuthGuard]
      },
      {
        path: 'auth',
        loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
        // canActivate: [NonAuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
