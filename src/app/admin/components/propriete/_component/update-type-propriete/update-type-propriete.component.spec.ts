import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeProprieteComponent } from './update-type-propriete.component';

describe('UpdateTypeProprieteComponent', () => {
  let component: UpdateTypeProprieteComponent;
  let fixture: ComponentFixture<UpdateTypeProprieteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTypeProprieteComponent]
    });
    fixture = TestBed.createComponent(UpdateTypeProprieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
