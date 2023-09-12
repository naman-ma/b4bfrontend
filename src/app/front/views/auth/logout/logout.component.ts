import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {

    // logout the user and clear the local storage
    if (this.authService.logout()) {

      this.activatedRoute.queryParams.subscribe(data => {
        if (data['redir'] === 'admin') {
          this.router.navigate(['/admin/login']);
        } else {
          this.authService.userSignedIn$.next(false);
          this.router.navigate(['/auth/login']);
        }
      });

    }
  }

}
