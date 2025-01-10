import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeProprieteComponent } from './add-type-propriete.component';

describe('AddTypeProprieteComponent', () => {
  let component: AddTypeProprieteComponent;
  let fixture: ComponentFixture<AddTypeProprieteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTypeProprieteComponent]
    });
    fixture = TestBed.createComponent(AddTypeProprieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
