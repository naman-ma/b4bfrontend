import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/admin/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Response } from 'src/app/admin/interfaces/response';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})

export class UsersListingComponent implements OnInit {

  /**
	 * Holds all the existing users list.
	 * @type {Array<users>}
	 */
  public allUsers: Array<any> = [];

  /**
   * search keyword
   */
  public search: string = '';

  /**
	 * Options for sorting parameters
	 * 
	 * @type {object}
	 */
  public sort = {
    field: 'created_at',
    order: 'DESC'
  };

  /**
	 * Paginator object
	 */
  public paginate: {
    limit: number,
    offset: number,
    total: number,
    filtered: number
  } = {
      limit: 10,
      offset: 0,
      total: 0,
      filtered: 0
    };

  /**
	 * Go to page number
	 * 
	 * @type {Number}
	 */
  public goToPage = 1;

  public noRows = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService
  ) { }

  /**
	 * Runs on component init
	 */
  ngOnInit() {
    this.getAllUsers();
  }

  /**
   * Fetches all users from the db
   */
  getAllUsers() {
    this.spinner.show();

    const params: any = {
      sort: this.sort,
      paginate: this.paginate,
    };

    if (this.search == '' || (this.search == ' ' && this.search.length === 1) || this.search == undefined) {
      // this.toastr.warning('Please enter something to search!');
      // return false;
    } else {
      this.search = this.search.trim();
      params.search = this.search;
    };

    this.userService.getAllUsers(params).subscribe((response: Response) => {
      this.spinner.hide();
      if (response['success']) {
        this.allUsers = response['payload']['rows'] || [];
        if (!this.allUsers.length) {
          this.noRows = true;
        } else {
          this.noRows = false;
        }
        this.paginate = response['payload']['paginate'];
      }
    });
  }

  /**
   * Function to check whether Object is empty or NOT
   * 
   * @param obj {Object}
   * 
   * @returns true if Object is empty
   */
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  /**
   * 
   * @param user {Object}
   */
  getUserDetails(user: any) {
    if (this.isEmpty(user)) {
      // Object is empty (Would return true)
      return this.toastr.info('User detials not available!');
    } else {
      // Object is NOT empty
      this.router.navigate(['/admin/user', user.uid]);
    }
  }


  /**
	 * Sets sort parameters
	 * 
	 * @param {string} field
	 * @param {string} order
	 */
  sortBy(field: string, order: string) {
    this.sort = {
      field, order
    };

    return this.getAllUsers();
  }

  /**
   * Searches user by provided keyword.
   */
  searchByKeyword(event) {
    this.search = event.target.value.replace(/\s+/g, ' ');
    // this.getAllUsers();
  }

  /* search the user */
  getSearchedUser() {
    // if (this.search == '' || (this.search == ' ' && this.search.length === 1) || this.search == undefined) {
    //   this.toastr.warning('Please enter something to search!');
    // 	return false;
    // } 
    this.getAllUsers();
  }

  /**
   * Fetches last page data.
   */
  back() {
    this.paginate.offset > 0 ? this.paginate.offset -= this.paginate.limit : 0;
    this.getAllUsers();
  }

  /**
   * Fetches next page data.
   */
  next() {
    this.paginate.offset < this.paginate.filtered ? this.paginate.offset += this.paginate.limit : 0;
    this.getAllUsers();
  }

  /**
   * Calculates current page number.
   */
  get currentPage() {
    return this.paginate.offset ? Math.floor(this.paginate.offset / this.paginate.limit) + 1 : 1;
  }

  /**
   * Calculates total pages
   */
  get pages() {
    return Math.ceil(this.paginate.filtered / this.paginate.limit) || 1;
  }

  /**
   * Fetches data for a specifc page.
   */
  getPage() {
    if (!Number(this.goToPage).toFixed() || this.goToPage <= 0) {
      this.toastr.warning('Please specify a valid page!');
      return false;
    }

    if ((this.goToPage) > this.pages) {
      this.toastr.warning('Request page exceeding number of available pages(' + this.pages + ')');
      return false;
    }

    this.paginate.offset = (this.goToPage - 1) * this.paginate.limit;
    this.getAllUsers();
  }

}
