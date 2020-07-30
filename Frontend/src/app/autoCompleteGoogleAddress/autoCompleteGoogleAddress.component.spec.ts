/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AutoCompleteGoogleAddressComponent } from './autoCompleteGoogleAddress.component';

describe('AutoCompleteGoogleAddressComponent', () => {
  let component: AutoCompleteGoogleAddressComponent;
  let fixture: ComponentFixture<AutoCompleteGoogleAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteGoogleAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteGoogleAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
