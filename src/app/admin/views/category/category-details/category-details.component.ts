import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/admin/services/category.service';
import { Response } from 'src/app/admin/interfaces/response';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})

export class CategoryDetailsComponent implements OnInit {

  @ViewChild("OpenAddEditCategoryModal", { static: false }) OpenAddEditCategoryModal;

  public categoryUid;
  public categoryDetails;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private toaster: ToastrService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.categoryUid = params.id;
        this.getCategoryDetails(params.id);
      })
  }

  /**
 * 
 * @param categoryUid : string
 */
  getCategoryDetails(categoryUid: string) {
    this.categoryService.getCategoryDetails(categoryUid).subscribe((response: Response) => {
      console.log('response: getCategoryDetails()', response);
      if (response['success'] && response['payload']) {
        this.categoryDetails = response['payload'];
      }
    },
      (error: any) => {
        console.log('error: ', error);
      });
  }

  /* opens category edit modal as per the type */
  openEditCategoryModal(type) {
    this.OpenAddEditCategoryModal.openModal(type, this.categoryDetails);
  }

}
