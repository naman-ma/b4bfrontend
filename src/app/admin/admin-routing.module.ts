import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthModule } from './views/auth/auth.module';
import { P404Component } from './views/error/404.component';
import { LoginComponent } from './views/auth/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'dashboard',
        redirectTo: ''
      },
      {
        path: 'platform',
        loadChildren: () => import('./views/platform/platform.module').then(m => m.PlatformModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./views/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./views/category/category.module').then(m => m.CategoryModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AuthModule
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
