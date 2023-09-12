import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  /**
   * Fetches categories
   * 
   * @param {object} params
   */
  getAllCategories(params: object): Observable<any> {
    return this.http.get(`admin/category/allCategories`, {
      params: {
        data: JSON.stringify(params)
      }
    });
  }

  /**
   * 
   * @param categoryUid : category uid string
   */
  getCategoryDetails(categoryUid: string): Observable<any> {
    return this.http.get(`admin/category/${btoa(categoryUid)}`);
  }

  /**
   * 
   * @param params {Object} category details
   */
  addCategory(params): Observable<any> {
    console.log('params:addCategory', params);
    return this.http.post(`admin/category/addCategory`, params);
  }

  /**
   * 
   * @param params {Object} category details
   */
  updateCategory(params): Observable<any> {
    console.log('params:updateCategory ', params);
    return this.http.put(`admin/category/addCategory`, params);
  }

  /**
   * returns total categories count
   */
  getAllCategoriesCount(): Observable<any> {
    return this.http.get(`admin/category/allCategoriesCount`);
  }

  /**
   * Adapter for handling errors via toastr for the service response.
   *
   * @param response Response
   * @returns response Response
   */
  _respond = (response: Response): Response => {
    if (!response.success) {
      this.toastr.error(response.message || 'Something went wrong!');
    } else if (response.success && response.message) {
      this.toastr.success(response.message);
    }
    return response;
  }

}
