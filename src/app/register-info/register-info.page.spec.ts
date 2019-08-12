import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInfoPage } from './register-info.page';

describe('RegisterInfoPage', () => {
  let component: RegisterInfoPage;
  let fixture: ComponentFixture<RegisterInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
