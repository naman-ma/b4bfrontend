import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let pass = false;
    if (Array.isArray(next.data.role)) {
      for (let i = 0; i < next.data.role.length; i++) {
        if (this.auth.hasRole(next.data.role[i])) {
          pass = true;
        }
      }
    } else {
      pass = this.auth.hasRole(next.data.role)
    }

    if (pass) {
      return true;
    } else {
      this.toastr.error('You are not authorized to view this page!');
      this.router.navigate(['/admin/']);
      return false;
    }
  }

}
