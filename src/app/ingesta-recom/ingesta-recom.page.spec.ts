import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngestaRecomPage } from './ingesta-recom.page';

describe('IngestaRecomPage', () => {
  let component: IngestaRecomPage;
  let fixture: ComponentFixture<IngestaRecomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngestaRecomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngestaRecomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
