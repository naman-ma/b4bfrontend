import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDistributorComponent } from './signup-distributor.component';

describe('SignupDistributorComponent', () => {
  let component: SignupDistributorComponent;
  let fixture: ComponentFixture<SignupDistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupDistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
