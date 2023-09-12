import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/admin/services/user.service';
import { PlatformService } from 'src/app/admin/services/platform.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

  /**
   * Container to hold all settings
   * @type {Array}
   */
  public settings: any[] = [];
  public allSettings;
  public addEditSettingForm: FormGroup;
  public modalRef;
  public activeModalSetting;

  constructor(
    private platformService: PlatformService,
    private builder: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.allSettings = this.platformService.fetchPlatformSettings();
    this.getAllSettings();
    this.addEditSettingForm = this.builder.group({
      uid: [''],
      key: [''],
      value: [''],
    });
  }

  /**
   * Fetches all settings for the platform admin
   */
  getAllSettings() {
    this.allSettings = this.platformService.getPlatformSettings();
  }

  viewModal(content, activeModal?, setting?) {
    this.activeModalSetting = activeModal;
    if (this.activeModalSetting == 'edit' && setting) {
      this.addEditSettingForm.patchValue({
        uid: setting.uid,
        key: setting.key,
        value: setting.value
      });
    }
    this.modalRef = this.modalService.open(content);
  }

  close() {
    this.modalRef.close();
    this.addEditSettingForm.reset();
  }

  addEditSetting() {
    if (!this.addEditSettingForm.value.key || !this.addEditSettingForm.value.value) {
      this.toastrService.info('Please fill the form fields..!!');
      return
    }

    if (this.activeModalSetting == 'add') {
      this.platformService.addPlatformSetting({
        key: this.addEditSettingForm.value.key.toLowerCase(),
        value: this.addEditSettingForm.value.value.toLowerCase()
      }).subscribe((response) => {
        if (response.success) {
          this.platformService.fetchPlatformSettings()
          setTimeout(() => {
            this.getAllSettings();
          }, 0);
          this.close();
        }
      })

    } else if (this.activeModalSetting == 'edit') {

      this.platformService.updatePlatformSetting({
        uid: this.addEditSettingForm.value.uid,
        key: this.addEditSettingForm.value.key.toLowerCase(),
        value: this.addEditSettingForm.value.value.toLowerCase()
      }).subscribe((response) => {
        if (response.success) {
          this.platformService.fetchPlatformSettings()
          setTimeout(() => {
            this.getAllSettings();
          }, 0);
          this.close();
        }
      })

    }
  }
}
