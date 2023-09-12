import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public allUsersCount;
  public allCategoriesCount;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.getAllPlatformUsersCount();
    this.getAllCategoriesCount();
  }

  getAllPlatformUsersCount() {
    this.userService.getAllPlatformUsersCount().subscribe((response: Response) => {
      if (response['success'] && response['payload']) {
        this.allUsersCount = response['payload'];
      }
    },
      (error: any) => {
        console.log('error: ', error);
      });
  }

  getAllCategoriesCount() {
    this.categoryService.getAllCategoriesCount().subscribe((response: Response) => {
      if (response['success'] && response['payload']) {
        this.allCategoriesCount = response['payload'];
      }
    },
      (error: any) => {
        console.log('error: ', error);
      });
  }
}
