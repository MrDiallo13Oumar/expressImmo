import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProprieteComponent } from './add-propriete.component';

describe('AddProprieteComponent', () => {
  let component: AddProprieteComponent;
  let fixture: ComponentFixture<AddProprieteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProprieteComponent]
    });
    fixture = TestBed.createComponent(AddProprieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
