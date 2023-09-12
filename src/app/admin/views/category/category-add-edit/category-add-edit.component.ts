import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/admin/services/category.service';
import { Response } from 'src/app/admin/interfaces/response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.scss']
})

export class CategoryAddEditComponent implements OnInit {

  @ViewChild("OpenAddEditCategoryModal", { static: false }) OpenAddEditCategoryModal: any;

  public addEditCategoryForm: FormGroup;
  public modalRef;
  public activeModal = 'add';
  /**
   * Holds all category list
   * @type {Array<category>}
   */
  public allCategories: Array<any> = [];
  /**
   * Holds all language list
   * @type {Array<language>}
   */
  public allLanguages: Array<any> = [
    { id: 1, name: 'English', abbrev: 'en' },
    { id: 2, name: 'French', abbrev: 'fr' }
  ];


  constructor(
    private builder: FormBuilder,
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getAllCategories();

    this.addEditCategoryForm = this.builder.group({
      uid: [''],
      category_name_en: [''],
      category_name_fr: [''],
      parent_id: [''],
      // language: ['', Validators.required]
    });
  }

  /**
   * Fetches all users from the db
   */
  getAllCategories() {
    this.categoryService.getAllCategories({}).subscribe((response: Response) => {
      if (response['success']) {
        this.allCategories = response['payload']['rows'] || [];
      }
    });
  }


  openModal(activeModal, category?) {
    this.activeModal = activeModal;
    if (this.activeModal == 'edit' && category) {
      this.addEditCategoryForm.patchValue({
        uid: category.uid,
        category_name_en: category.category_name,
        category_name_fr: category.metas[1].type_value ? category.metas[1].type_value : '',
        parent_id: category.parent_id,
        // language: category.metas[0].translations[0].language
      });
    }
    return this.modalRef = this.modalService.open(this.OpenAddEditCategoryModal, {
      centered: true,
      size: "lg"
      // windowClass: "myCustomModalClass"
    });

  }

  close() {
    this.modalRef.close();
    this.addEditCategoryForm.reset();
  }

  addEditCategory() {

    if (!this.addEditCategoryForm.value.category_name_en) {
      return this.toastrService.info('Please fill the form fieds!');
    }

    if (this.activeModal == 'add') {
      this.categoryService.addCategory({
        category_name_en: this.addEditCategoryForm.value.category_name_en.toLowerCase(),
        category_name_fr: this.addEditCategoryForm.value.category_name_fr.toLowerCase(),
        parent: this.addEditCategoryForm.value.parent_id ? this.addEditCategoryForm.value.parent_id.category_name.toLowerCase() : '',
        // language: this.addEditCategoryForm.value.language.abbrev,
      }).subscribe((response) => {
        // console.log('response: addCategory--', response);
        if (response['success']) {
          this.modalRef.close(response);
          this.toastrService.success(response['message']);
          this.addEditCategoryForm.reset();
        }
      })

    } else if (this.activeModal == 'edit') {

      this.categoryService.updateCategory({
        uid: this.addEditCategoryForm.value.uid,
        category_name: this.addEditCategoryForm.value.category_name.toLowerCase(),
        parent: this.addEditCategoryForm.value.parent_id ? this.addEditCategoryForm.value.parent_id.category_name.toLowerCase() : '',
        language: this.addEditCategoryForm.value.language.abbrev,
      }).subscribe((response) => {
        console.log('response:updateCategory--- ', response);
      })

    }

  }

}
