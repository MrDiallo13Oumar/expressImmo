import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocataireComponent } from './add-locataire.component';

describe('AddLocataireComponent', () => {
  let component: AddLocataireComponent;
  let fixture: ComponentFixture<AddLocataireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLocataireComponent]
    });
    fixture = TestBed.createComponent(AddLocataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
